import {StyleSheet, Text, View, SectionList} from "react-native";
import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import {TextStyle, Padding, Margin} from "../../share/style"
import {COLOR_LIGHT} from "../style/var";
import Toast from 'react-native-root-toast';

export default class AtoZList extends React.Component {
    sectionListRef = React.createRef();
    keyListRef = React.createRef();
    listOffsetY = 0;
    keysOffsetY = [];
    throttledTouchHandler = _.throttle(this.handListKeyTouch.bind(this), 50, {
        leading: true,
        trailing: false
    });


    state = {
        currKey: null
    };

    handListKeyTouch(evt) {
        let index = _.findIndex(this.keysOffsetY, offset => {
            return this.listOffsetY + offset > evt.nativeEvent.pageY
        });
        if (index === -1) {
            index = this.keysOffsetY.length - 1
        }
        this.setState({
            currKey: index
        });
        this.sectionListRef.current.scrollToLocation({
            animated: true,
            sectionIndex: index,
            itemIndex: 0,
            viewPosition: 0
        })
    }

    render() {
        let {
            listKeys,
            data,
            renderItem,
            renderSectionHeader,
            onPartition,
            onScrollToIndexFailed,
            ...rest
        } = this.props;
        listKeys = [
            ...listKeys,
            "#"
        ];
        const partition = Array.from(Array(listKeys.length), () => []);
        data.forEach(d => {
            // Use provided partition function to determine which session to put into. if return false or null, put into last
            const key = onPartition(d);
            if (isNaN(key) || key < 0 || key >= listKeys.length) {
                throw new Error("Invalid return value from onPartition function. Must return an integer between 0 and length of list keys - 1 or false")
            }
            if (key !== false && key !== null) {
                partition[key].push(d);
            } else {
                partition[partition.length - 1].push(d)
            }
        });

        const sections = listKeys.map((k, index) => ({
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
                            {listKeys[this.state.currKey]}
                        </Toast>
                    )
                }

                <SectionList
                    {...rest}
                    ref={this.sectionListRef}
                    style={styles.sectionList}
                    renderItem={renderItem}
                    renderSectionHeader={renderSectionHeader}
                    onScrollToIndexFailed={onScrollToIndexFailed}
                    sections={sections}
                    keyExtractor={(item, index) => item + index}
                />
                <View style={styles.listKeyWrapper}
                      ref={this.keyListRef}
                      onLayout={evt => {
                          this.keyListRef.current.measure((fx, fy, width, height, px, py) => {
                              this.listOffsetY = py;
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
                        listKeys.map((key, index) => (
                            <View key={index}
                                  onLayout={evt => {
                                      this.keysOffsetY.push(evt.nativeEvent.layout.y)
                                  }}
                            >
                                <Text style={styles.listKey}>{key}</Text>
                            </View>
                        ))
                    }
                </View>
            </View>
        );
    }
}

AtoZList.defaultProps = {
    listKeys: _.range(65, 91).map(ascii => String.fromCharCode(ascii)),
    renderItem: ({item, index, section}) => (
        <View style={styles.listItem}>
            <Text key={index}>{item}</Text>
        </View>
    ),
    renderSectionHeader: ({section: {title}}) => (
        <Text style={styles.sectionTitle}>{title}</Text>
    ),
    onScrollToIndexFailed: (error) => {
        console.log("onScrollToIndexFailed called. Ignoring error. override the method to handle the method");
    }
};

AtoZList.propTypes = {
    listKeys: PropTypes.arrayOf(PropTypes.string),
    renderItem: PropTypes.func,
    renderSectionHeader: PropTypes.func,
    data: PropTypes.arrayOf(PropTypes.any).isRequired,
    onPartition: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row"
    },
    sectionList: {
        flex: 1,
    },
    sectionTitle: {
        ...Padding.py1,
        ...Margin.mx2,
        ...TextStyle.textPrimary,
        ...TextStyle.sm,
        justifyContent: "flex-start",
        flex: 1,
        borderBottomWidth: 1,
        borderColor: COLOR_LIGHT,

    },
    listItem: {
        ...Padding.py3,
        ...Margin.mx2,
        borderBottomWidth: 1,
        borderColor: COLOR_LIGHT
    },
    listKeyWrapper: {
        ...Padding.py3,
        alignItems: "center",
    },
    listKey: {
        ...TextStyle.sm,
        ...Padding.py1,
        ...Padding.px1,
    }
});