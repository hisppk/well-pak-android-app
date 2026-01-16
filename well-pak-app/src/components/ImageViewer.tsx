import React from 'react';
import { Image } from 'react-native';

import { Icon, Col, } from 'components';

type Props = {
    uri: string,
    size?: any,
    width?: any,
    height?: any,
    borderRadius?: any,
}

export const ImageViewer = (props: Props) => {
    const { uri, size, width, height, borderRadius } = props
    if (!uri)
        return (
            <Col noFlex>
                <Icon
                    type="post-placeholder"
                    size={size}
                    width={width}
                    height={height}
                    borderRadius={borderRadius}
                />
            </Col>
        );

    return (
        <Col noFlex >
            <Image
                source={{ uri }}
                style={{
                    width: width ? width : size || 25,
                    height: height ? height : size || 25,
                    marginTop: 1,
                    borderRadius: borderRadius ? borderRadius : 0,
                    alignSelf: 'center',
                    borderColor: 'white',
                }}
            />
        </Col>
    );
};
