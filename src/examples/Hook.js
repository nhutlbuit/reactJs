import React, { useState } from 'react';
import '../components/ColorBox/ColorBox.scss';

Hook.propTypes = {

};

function Hook() {

    // callback for initing userState first time.
    const [color, setColor] = useState(()=> localStorage.getItem('box_color') || 'green'); 

    function onClick() {
        const newColor = getRandomColor();
        setColor(newColor);
        localStorage.setItem('box_color', newColor);
    }

    return (
        <div 
        className="color-box" 
        style={{backgroundColor: color }}
        onClick ={onClick}
         >
            Wellcome to React Hook useState!
        </div>
    );

}

function getRandomColor() {
    const COLOR_LIST = ['red', 'green','yellow', 'pink', 'blue'];
    const randomIndex = Math.trunc(Math.random()*5);
    return COLOR_LIST[randomIndex]
}

export default Hook;
