import {StyleSheet, Text, View, SectionList} from "react-native";
import {SearchBar} from "react-native-elements";
import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import {TextStyle, SpacingStyle, BackgroundStyle, BorderStyle} from "../styles"
import memoize from "memoize-one";
import Toast from 'react-native-root-toast';

export default class AtoZList extends React.Component {
    mainListRef = React.createRef();
    indexListRef = React.createRef();
    indexListOffsetY = 0;
    indexesOffsetY = [];
    throttledTouchHandler = _.throttle(this.handleIndexListTouch.bind(this), 20, {
        leading: true,
        trailing: false
    });

    // https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#what-about-memoization
    doPartition = memoize((indexes, data) => {
        const { onPartition } = this.props;
        const partition = Array.from(Array(indexes.length), () => []);
        data.forEach(d => {
            // Use provided partition function to determine which session to put into. if return false or null, put into last
            const key = onPartition(d);
            if (isNaN(key) || key < 0 || key >= indexes.length) {
                throw new Error("Invalid return value from onPartition function. Must return an integer between 0 and length of list keys - 1 or false")
            }
            if (key !== false && key !== null) {
                partition[key].push(d);
            } else {
                partition[partition.length - 1].push(d)
            }
        });
        return indexes.map((k, index) => ({
            title: k,
            data: partition[index]
        }));
    });

    doFilter = memoize((query, data) => {
        if (!!query) {
            const { onFilter } = this.props;
            return _.filter(data, d => {
                return onFilter(query, d);
            });
        } else {
            return data;
        }

    });

    state = {
        currKey: null,
        query: "",
    };

    handleIndexListTouch(evt) {
        let index = _.findLastIndex(this.indexesOffsetY, offset => {
            return this.indexListOffsetY + offset < evt.nativeEvent.pageY
        });
        if (index === -1) {
            if (evt.nativeEvent.pageY > this.indexListOffsetY) {
                index = this.indexesOffsetY.length - 1;
            } else {
                index = 0;
            }
        }
        this.setState({
            currKey: index,
        });
        this.mainListRef.current.scrollToLocation({
            animated: false,
            sectionIndex: index,
            itemIndex: 0,
            viewPosition: 0
        })
    }

    render() {
        let {
            indexes,
            data,
            renderItem,
            renderSectionHeader,
            keyExtractor,
            onPartition,
            onScrollToIndexFailed,
            ...rest
        } = this.props;

        data = this.doFilter(this.state.query, data);
        const partition = this.doPartition(indexes, data);

        return (
            <View style={styles.container}>
                {
                    this.state.currKey !== null && (
                        <Toast
                            position={Toast.positions.CENTER}
                            animation={true}
                            opacity={0.5}
                            visible={true}
                        >
                            {indexes[this.state.currKey]}
                        </Toast>
                    )
                }
                <SearchBar
                    containerStyle={styles.searchBar}
                    inputContainerStyle={styles.searchBarInput}
                    searchIcon={styles.searchBarIcon}
                    platform={"ios"}
                    value={this.state.query}
                    onChangeText={query => {
                        this.setState({
                            query: query
                        });
                    }}
                    onClearText={query => {
                        this.setState({
                            query: query
                        });
                    }}
                    placeholder='Type Here...'
                    lightTheme={true}
                />
                <View style={styles.listWrapper}>
                    <SectionList
                        {...rest}
                        ref={this.mainListRef}
                        style={styles.mainList}
                        stickySectionHeadersEnabled={true}
                        renderItem={renderItem}
                        renderSectionHeader={renderSectionHeader}
                        keyExtractor={keyExtractor}
                        onScrollToIndexFailed={onScrollToIndexFailed}
                        sections={partition}
                    />
                    <View style={styles.indexList}
                          ref={this.indexListRef}
                          onLayout={evt => {
                              this.indexListRef.current.measure((fx, fy, width, height, px, py) => {
                                  this.indexListOffsetY = py;
                              })
                          }}
                          onStartShouldSetResponder={evt =>  true}
                          onMoveShouldSetResponder ={evt =>  true}
                          onResponderGrant={(evt) => {
                              evt.persist();
                              this.throttledTouchHandler(evt);
                          }}
                          onResponderMove={(evt) => {
                              evt.persist();
                              this.throttledTouchHandler(evt);
                          }}
                          onResponderRelease={evt => {
                              this.setState({
                                  currKey: null,
                              })
                          }}
                    >
                        {
                            indexes.map((key, index) => (
                                <View key={index}
                                      onLayout={evt => {
                                          this.indexesOffsetY.push(evt.nativeEvent.layout.y)
                                      }}
                                >
                                    <Text style={styles.index}>{key}</Text>
                                </View>
                            ))
                        }
                    </View>
                </View>

            </View>
        );
    }
}

AtoZList.defaultProps = {
    indexes: [
        ..._.range(65, 91).map(ascii => String.fromCharCode(ascii)),
        "#"
    ],
    renderItem: ({item, index, section}) => (
        <View style={styles.mainListItem}>
            <Text key={index}>{item}</Text>
        </View>
    ),
    renderSectionHeader: ({section: {title, data}}) => (
        data.length > 0 && <Text style={styles.mainListTitle}>{title}</Text>
    ),
    onScrollToIndexFailed: (error) => {
        // Suppress the error since it does not matter if scrolling failed
    },
    keyExtractor: (item, key) => {
        return key;
    }
};

AtoZList.propTypes = {
    indexes: PropTypes.arrayOf(PropTypes.string),
    renderItem: PropTypes.func,
    renderSectionHeader: PropTypes.func,
    data: PropTypes.arrayOf(PropTypes.any).isRequired,
    onPartition: PropTypes.func.isRequired,
    onFilter: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    container: {
    },
    searchBar: {
        ...BackgroundStyle.white,
    },
    searchBarInput: {
        ...BackgroundStyle.light
    },
    searchBarIcon: {
        ...BackgroundStyle.light,
    },
    listWrapper: {
        flexDirection: "row"
    },
    mainList: {
        flex: 1,
    },
    mainListTitle: {
        ...SpacingStyle.py1,
        ...SpacingStyle.px2,
        ...TextStyle.secondary,
        ...TextStyle.sm,
        ...TextStyle.bold,
        ...BackgroundStyle.light,
        justifyContent: "flex-start",
    },
    mainListItem: {
        ...SpacingStyle.py3,
        ...SpacingStyle.mx2,
        ...BorderStyle.borderBottom,
        ...BackgroundStyle.white,
    },
    indexList: {
        ...SpacingStyle.pt1,
        alignItems: "center",
    },
    index: {
        ...TextStyle.sm,
        ...SpacingStyle.pb1,
        ...SpacingStyle.px2,
    }
});