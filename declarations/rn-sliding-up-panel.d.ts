declare module "rn-sliding-up-panel" {

    import {ViewStyle} from "react-native";

    //Properties interface
    interface IProps {
        visible: boolean; //Deterimines whether the panel is visible.
        draggableRange?: { top: number, bottom: number }; //Boundary limits for draggable area. top default to visible height of device, bottom default to 0.
        height?: number; //Height of panel. Default to visible height of device.
        startCollapsed?: boolean; //Initially show the bottom peek header at the bottom instead of top.
        onRequestClose?: Function; //Called when you touch the backdrop or slide down to hide the panel.
        onDragStart?: (position: number) => void; //Called when the panel is about to start dragging.
        onDrag?: (position: number) => void; //Called when the panel is dragging. Fires at most once per frame.
        onDragEnd?: (position: number) => void;	//Called when you release your finger.
        showBackdrop?: boolean;	//Controls the visibility of backdrop. Default true.
        allowDragging?: boolean; //Default true. Setting this to false to disable dragging. Touching the backdrop triggers onRequestClose normally.
        allowMomentum?: boolean; //If false, panel will not continue to move when you release your finger.
        contentStyle?: ViewStyle; //The style of content inside panel. Deprecated. You should wrap your content inside a View.
        //children?: React.Element | Function; //Accepts passing a function as component. Invoked with dragHandlers (that can be passed into another View like this <View {...dragHandlers}>) when the panel is mounted. Useful when you want a part of your content that allows the user to slide the panel with.
    }

    //Panel class
    export default class SlidingUpPanel extends React.Component<IProps> {
    }

}