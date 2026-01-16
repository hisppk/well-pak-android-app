const boxStyles = (props) => {
  return `
    ${props.marg && `margin: ${props.marg}`};
    ${props.pad && `padding: ${props.pad}`};
    ${props.bg && `background-color: ${props.bg}`};
    ${props.ht && `height: ${props.ht}`};
    ${props.maxHt && `max-height: ${props.maxHt}`};
    ${props.wid && `width: ${props.wid}`};
    ${props.minWid && `min-width: ${props.minWid}`};
    ${props.hasRadius && `border-radius: ${props.hasRadius}`};
    ${props.hasShadow && `box-shadow: ${props.hasShadow}`};
    ${props.alignSelf && `align-self: ${props.alignSelf}`};
    ${props.border && `border: ${props.border}`};
    ${props.appShadow && `
    box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.2);
    elevation: 8;
  `};
    ${props.centerAll &&
    `
      align-items: center;
      justify-content: center;
    `
    };
    ${props.between && `justify-content: space-between;`};
    ${props.row && `flex-direction: row;`};
    ${props.center &&
    `
      align-items: center;
    `
    };

    ${props.absolute && `position: absolute;`};
    ${props.top && `top: ${props.top};`};
    ${props.bottom && `bottom: ${props.bottom};`};
    ${props.right && `right: ${props.right};`};
    ${props.left && `left: ${props.left};`};
    ${props.zIndex && `z-index: ${props.zIndex};`};
    ${props.flex && `display: flex;`};
    ${props.overflow && `overflow:${props.overflow};`};
    ${props.overflowX && `overflow-x:${props.overflowX};`};
    ${props.overflowY && `overflow-y:${props.overflowY};`};
  `
}

export default boxStyles