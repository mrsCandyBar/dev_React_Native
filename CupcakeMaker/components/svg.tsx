import { Svg, Use } from 'react-native-svg';
import React from 'react';
import SvgTemplate from './svgTemplate';

interface ISVGState { }
interface ISVGProps {
    visible: {
        svg?: any,
        flavour?: string,
        holder?: any,
        icing?: any,
        sprinkles?: any,
        topping?: string,
        optional?: boolean
    }
}

class SVG extends React.Component<ISVGProps, ISVGState> {

    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        const {
            flavour,
            holder,
            icing,
            sprinkles,
            topping,
            optional
        } = this.props.visible;

        return flavour != nextProps.flavour ||
            holder != nextProps.holder ||
            icing != nextProps.icing ||
            sprinkles != nextProps.sprinkles ||
            topping != nextProps.topping ||
            optional != nextProps.optional;
    }

    render() {
        const RenderSVG = svgObj => {
            return (
                svgObj.visibleList.map((section, index) => (
                    <Use
                        key={index}
                        href={`#${section}`}
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                    />
                )
                ))
        }

        const {
            svg,
            flavour,
            holder,
            icing,
            sprinkles,
            topping,
            optional
        } = this.props.visible;

        return (
            <Svg width={svg ? svg.width : '100%'} height={svg ? svg.height : '100%'} viewBox={svg ? svg.viewBox : "0 0 450 600"} x="0" y="0" preserveAspectRatio="xMinYMin meet">
                <SvgTemplate visible={this.props.visible} />
                <RenderSVG visibleList={[
                    (flavour && 'cake'),
                    (holder && `svg_holder_${holder.type}`),
                    (icing && optional && icing.type === 'flared' && `svg_tall_big_wafer`),
                    (icing && optional && icing.type === 'swirl' && `svg_wafers`),
                    (icing && `svg_muffin_top_${icing.type}`),

                    (sprinkles && sprinkles.type && (
                        icing && icing.type === 'swirl' ? `svg_tall_${sprinkles.type}` : `svg_short_${sprinkles.type}`)
                    ),
                    (optional && icing && icing.type !== 'swirl') && (icing.type === 'flared' ? `svg_icing_background` : `svg_cream_background`),
                    (topping &&
                        icing && icing.type === 'swirl' ? `svg_tall_${topping}` : `svg_short_${topping}`
                    ), ,
                    (optional && icing && icing.type !== 'swirl') && (icing.type === 'flared' ? `svg_icing_foreground` : `svg_cream_foreground`)
                ]} />
            </Svg>
        )
    }
}

export default SVG;