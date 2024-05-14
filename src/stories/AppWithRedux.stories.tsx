import type {Meta, StoryFn}   from  '@storybook/react';
import  AppWithRedux  from  "../AppWithRedux";
import {Provider} from "react-redux";
import {store} from "../store";


interface AppWithReduxStoryArgs {

}

// More on how to set up stories at:
// https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const  meta: Meta<  typeof  AppWithRedux> = {
    title:   'TODOLISTS/AppWithRedux',
    component:   AppWithRedux,
    // This component will have an automatically generated Autodocs entry:
    // https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: [  'autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes

};

export default  meta;

const Template: StoryFn<AppWithReduxStoryArgs> = () => (
    <Provider store={store}>
        <AppWithRedux />
    </Provider>
);

// More on component templates:
// https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const AppWithReduxStory = Template.bind({});
