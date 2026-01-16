import React from 'react'
import Pdf from 'react-native-pdf';
import Col from './Col';

type Props = {
    uri: string,
    size?: any,
    width?: any,
    height?: any,
    isHorizental: boolean;
}

export const PdfViewer = (props: Props) => {
    const { uri, size, width, height, isHorizental } = props
    return (
        <Col noFlex >
            <Pdf
                horizontal={isHorizental}
                source={{ uri: uri, cache: true }}
                trustAllCerts={false}
                onLoadComplete={(numberOfPages, filePath) => {
                    // console.log(`Number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page, numberOfPages) => {
                    // console.log(`Current page: ${page}`);
                }}
                onError={(error) => {
                    // console.log(error);
                }}
                onPressLink={(uri) => {
                    // console.log(`Link pressed: ${uri}`);
                }}
                style={{
                    width: width ? width : size || 25,
                    height: height ? height : size || 25,
                    marginTop: 1,
                    alignSelf: 'center',
                    borderColor: 'white',
                }}
            />
        </Col>
    )
}
