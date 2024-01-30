import React from 'react';
import {FlexWrapper} from "../FlexWrapper";

export const TodoListDesktop = () => {
    return (
        <FlexWrapper direction={'column'}>
            <h3>What to learn</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                <li><input type='checkbox' checked={true}/> <span>HTML&CSS</span></li>
                <li><input type='checkbox' checked={true}/> <span>JS</span></li>
                <li><input type='checkbox' checked={false}/> <span>React</span></li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </FlexWrapper>

    );
};

