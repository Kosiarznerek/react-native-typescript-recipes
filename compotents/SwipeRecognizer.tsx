/**
 * Based on https://github.com/glepur/react-native-swipe-gestures
 * Had to be changed because of scrollView / listView problem
 */

import * as React from 'react';
import {
    View,
    PanResponder,
    PanResponderInstance,
    GestureResponderEvent, PanResponderGestureState
} from 'react-native';

//Avaiable swipe directions
export enum swipeDirections {
    SWIPE_LEFT = 'SWIPE_LEFT',
    SWIPE_RIGHT = 'SWIPE_RIGHT'
}

//Swipe config interface
interface ISwipeConfig {
    velocityThreshold: number,
    directionalOffsetThreshold: number
}

//Default swipe config
const swipeConfig: ISwipeConfig = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
};

//Properties interface
interface IProps {
    onSwipe: (direction: swipeDirections, gestState: PanResponderGestureState) => any,
    onSwipeLeft?: (gestState: PanResponderGestureState) => any,
    onSwipeRight?: (gestState: PanResponderGestureState) => any,
    config: ISwipeConfig
}

//SwipeRecognizer class
export default class SwipeRecognizer extends React.Component<IProps> {

    private swipeConfig: ISwipeConfig;
    private _panResponder: PanResponderInstance;

    constructor(props: IProps) {
        super(props);
        this.swipeConfig = Object.assign(swipeConfig, props.config);
    }

    componentWillReceiveProps(props: IProps) {
        this.swipeConfig = Object.assign(swipeConfig, props.config);
    }

    componentWillMount() {
        const responderEnd = this._handlePanResponderEnd.bind(this);
        const shouldSetResponder = this._handleShouldSetPanResponder.bind(this);
        this._panResponder = PanResponder.create({ //stop JS beautify collapse
            onStartShouldSetPanResponder: shouldSetResponder,
            onMoveShouldSetPanResponder: shouldSetResponder,
            onPanResponderRelease: responderEnd,
            onPanResponderTerminate: responderEnd,
        });
    }

    /**
     * Checks if swipe is valid
     * @param {number} v Velocity
     * @param {number} vt Velocity threshold
     * @param {number} dir_o Directional offset
     * @param {number} dot Directional offset threshold
     * @return {boolean}
     * @private
     */
    private _isValidSwipe(v: number, vt: number, dir_o: number, dot: number): boolean {
        return Math.abs(v) > vt && Math.abs(dir_o) < dot;
    }

    /**
     * Pan responder handler
     * @param {GestureResponderEvent} evt
     * @param {PanResponderGestureState} gestureState
     * @return {boolean}
     * @private
     */
    private _handleShouldSetPanResponder(evt: GestureResponderEvent, gestureState: PanResponderGestureState): boolean {
        return evt.nativeEvent.touches.length === 1 && !this._gestureIsClick(gestureState);
    }

    /**
     * Checks if geture is click
     * @param {PanResponderGestureState} gestureState
     * @return {boolean}
     * @private
     */
    private _gestureIsClick(gestureState: PanResponderGestureState) {
        return Math.abs(gestureState.dx) < 30 //&& Math.abs(gestureState.dy) < 30;
    }

    /**
     * Pan responder handler
     * @param {GestureResponderEvent} evt
     * @param {PanResponderGestureState} gestureState
     * @private
     */
    private _handlePanResponderEnd(evt: GestureResponderEvent, gestureState: PanResponderGestureState): void {
        const swipeDirection = this._getSwipeDirection(gestureState);
        swipeDirection && this._triggerSwipeHandlers(swipeDirection, gestureState);
    }

    /**
     * Swipe handler
     * @param {swipeDirections} swipeDirection
     * @param {PanResponderGestureState} gestureState
     * @private
     */
    private _triggerSwipeHandlers(swipeDirection: swipeDirections, gestureState: PanResponderGestureState): void {
        const {onSwipe, onSwipeLeft, onSwipeRight} = this.props;
        const {SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
        onSwipe && onSwipe(swipeDirection, gestureState);
        switch (swipeDirection) {
            case SWIPE_LEFT:
                onSwipeLeft && onSwipeLeft(gestureState);
                break;
            case SWIPE_RIGHT:
                onSwipeRight && onSwipeRight(gestureState);
                break;
        }
    }

    /**
     * Gets swipe direction
     * @param {PanResponderGestureState} gestureState
     * @return {swipeDirections | null}
     * @private
     */
    private _getSwipeDirection(gestureState: PanResponderGestureState): swipeDirections | null {
        const {SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
        const {dx} = gestureState;
        if (this._isValidHorizontalSwipe(gestureState)) {
            return (dx > 0)
                ? SWIPE_RIGHT
                : SWIPE_LEFT;
        }
        return null;
    }

    /**
     * Checks if swipe is horizontal
     * @param {PanResponderGestureState} gestureState
     * @return {boolean}
     * @private
     */
    private _isValidHorizontalSwipe(gestureState: PanResponderGestureState): boolean {
        const {vx, dy} = gestureState;
        const {velocityThreshold, directionalOffsetThreshold} = this.swipeConfig;
        return this._isValidSwipe(vx, velocityThreshold, dy, directionalOffsetThreshold);
    }

    render() {
        return (<View {...this.props} {...this._panResponder.panHandlers} />);
    }
}
