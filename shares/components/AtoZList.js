import {StyleSheet, Text, View, SectionList} from "react-native";
import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import {TextStyle, Padding, Margin} from "../styles"
import {COLOR_LIGHT} from "../styles/var";
import Toast from 'react-native-root-toast';

export default class AtoZList extends React.Component {
    mainListRef = React.createRef();
    indexListRef = React.createRef();
    indexListOffsetY = 0;
    indexesOffsetY = [];
    throttledTouchHandler = _.throttle(this.handleIndexListTouch.bind(this), 50, {
        leading: true,
        trailing: false
    });


    state = {
        currKey: null
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
            currKey: index
        });
        this.mainListRef.current.scrollToLocation({
            animated: true,
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
            onPartition,
            onScrollToIndexFailed,
            ...rest
        } = this.props;
        indexes = [
            ...indexes,
            "#"
        ];
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

        const sections = indexes.map((k, index) => ({
            title: k,
            data: partition[index]
        }));
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

                <SectionList
                    {...rest}
                    ref={this.mainListRef}
                    style={styles.mainList}
                    renderItem={renderItem}
                    renderSectionHeader={renderSectionHeader}
                    onScrollToIndexFailed={onScrollToIndexFailed}
                    sections={sections}
                    keyExtractor={(item, index) => item + index}
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
        );
    }
}

AtoZList.defaultProps = {
    indexes: _.range(65, 91).map(ascii => String.fromCharCode(ascii)),
    renderItem: ({item, index, section}) => (
        <View style={styles.mainListItem}>
            <Text key={index}>{item}</Text>
        </View>
    ),
    renderSectionHeader: ({section: {title}}) => (
        <Text style={styles.mainListTitle}>{title}</Text>
    ),
    onScrollToIndexFailed: (error) => {
        // Suppress the error since it does not matter if scrolling failed
    }
};

AtoZList.propTypes = {
    indexes: PropTypes.arrayOf(PropTypes.string),
    renderItem: PropTypes.func,
    renderSectionHeader: PropTypes.func,
    data: PropTypes.arrayOf(PropTypes.any).isRequired,
    onPartition: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row"
    },
    mainList: {
        flex: 1,
    },
    mainListTitle: {
        ...Padding.py1,
        ...Margin.mx2,
        ...TextStyle.textPrimary,
        ...TextStyle.sm,
        justifyContent: "flex-start",
        flex: 1,
        borderBottomWidth: 1,
        borderColor: COLOR_LIGHT,

    },
    mainListItem: {
        ...Padding.py3,
        ...Margin.mx2,
        borderBottomWidth: 1,
        borderColor: COLOR_LIGHT
    },
    indexList: {
        ...Padding.py3,
        alignItems: "center",
    },
    index: {
        ...TextStyle.sm,
        ...Padding.py1,
        ...Padding.px1,
    }
});