import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg from './components/svg';
import { findIndex, get, set, isArray } from 'lodash';

interface IAppProps { }
interface IAppState {
  cupcake: {
    flavour: string,
    holder: {
      type: string,
      colour: string
    },
    icing: {
      type: string,
      colour: string
    },
    sprinkles: {
      type: string,
      colour: string
    },
    topping: string,
    optional: boolean
  },
  options: {
    flavour: Array<string>,
    holder: {
      type: Array<string>,
      colour: Array<string>
    },
    icing: {
      type: Array<string>,
      colour: Array<string>
    },
    sprinkles: {
      type: Array<string>,
      colour: Array<string>
    },
    topping: Array<string>,
    optional: Array<boolean>
  },
  matchCupcake: {
    flavour: "vanilla",
    holder: {
      type: "dotted",
      colour: "green"
    },
    icing: {
      type: "smooth",
      colour: "specialVanilla"
    },
    sprinkles: {
      type: "sprinkles",
      colour: "yellow"
    },
    topping: "cherry",
    optional: false
  },
}

export default class App extends React.Component<IAppProps, IAppState> {

  constructor(props) {
    super(props);
    this.state = {
      cupcake: {
        flavour: "vanilla",
        holder: {
          type: "dotted",
          colour: "green"
        },
        icing: {
          type: "smooth",
          colour: "specialVanilla"
        },
        sprinkles: {
          type: "sprinkles",
          colour: "yellow"
        },
        topping: "cherry",
        optional: false
      },
      options: {
        flavour: ["vanilla", "caramelDarker", "brown"],
        holder: {
          type: ["dotted", "striped"],
          colour: ["yellow", "red", "purple", "green", "navy"]
        },
        icing: {
          colour: ["cream", "caramel", "redLighter", "chocolate"],
          type: ["smooth", "run", "flared", "swirl"]
        },
        sprinkles: {
          colour: ["yellow", "pink", "brown", "green"],
          type: ["salt", "salt_single", "sprinkles", "sprinkles_single"]
        },
        topping: ["cherry", "strawberry", "citrus", "gumball", "candle", "heart", "flower"],
        optional: [false, true]
      },
      matchCupcake: {
        flavour: "vanilla",
        holder: {
          type: "dotted",
          colour: "green"
        },
        icing: {
          type: "smooth",
          colour: "specialVanilla"
        },
        sprinkles: {
          type: "sprinkles",
          colour: "yellow"
        },
        topping: "cherry",
        optional: false
      },
    }
  }

  componentDidMount = () => {
    this.generateRandomCupcake();
  }

  private generateRandomCupcake = () => {
    const getOptions = this.state.options;
    let newCupcake: any = {};

    Object.keys(getOptions).forEach((optionType) => {
      if (isArray(getOptions[optionType])) {
        const randomNumber = Math.floor(Math.random() * getOptions[optionType].length);
        return newCupcake[optionType] = getOptions[optionType][randomNumber];

      } else {
        newCupcake[optionType] = {};
        Object.keys(getOptions[optionType]).map((innerObjectType) => {
          const innerRandomNumber = Math.floor(Math.random() * getOptions[optionType][innerObjectType].length);
          return newCupcake[optionType][innerObjectType] = getOptions[optionType][innerObjectType][innerRandomNumber];
        });
      }
    });

    this.setState({
      matchCupcake: { ...newCupcake }
    });
  }

  private swapOut = optionType => {
    const allOptions = get(this.state.options, optionType);
    const selectedOption = get(this.state.cupcake, optionType);
    const activeIndex = findIndex(allOptions, option => option === selectedOption);

    let updateState = this.state.cupcake;
    set(updateState, optionType, allOptions[(activeIndex == allOptions.length - 1) ? 0 : activeIndex + 1]);

    this.setState({
      cupcake: { ...updateState }
    },function () {
      console.log('updated! ');
     });
  }

  render() {
    const { flavour, holder, icing, sprinkles, topping, optional } = this.state.cupcake;
    const leftAlignSvg = { width: '200%', height: '100%', viewBox: '5 0 450 600' };
    const rightAlignSvg = { width: '200%', height: '100%', viewBox: '230 0 450 600' };

    return (
      <View style={styles.container}>
        <View style={[styles.isRow, { flex: 2, marginTop: 25 }]}>
          <View style={{ flexDirection: 'column', flex: 1 }}>
            <Svg visible={this.state.matchCupcake} />
          </View>
        </View>

        <View style={[styles.isRow, { flex: 8, alignItems: 'center', justifyContent: 'center' }]}>
          <View style={[styles.single, styles.halfSvg]}>
            <Svg visible={{ ...this.state.cupcake, svg: leftAlignSvg }} />
          </View>
          <View style={[styles.single, styles.halfSvg]}>
            <Svg visible={{ ...this.state.matchCupcake, svg: rightAlignSvg }} />
          </View>
        </View>

        <View style={[styles.single, styles.isRow, { backgroundColor: '#161616', paddingBottom: 5, marginTop: 20 }]}>
          <View style={styles.single} onTouchEnd={() => this.swapOut('flavour')}>
            <Svg visible={{ flavour: flavour }} />
          </View>

          <View style={[styles.single, styles.isRow]}>
            <View style={[styles.single, styles.halfSvg]} onTouchEnd={() => this.swapOut('holder.type')}>
              <Svg visible={{ holder: { type: holder.type }, svg: leftAlignSvg }} />
            </View>
            <View style={[styles.single, styles.halfSvg]} onTouchEnd={() => this.swapOut('holder.colour')}>
              <Svg visible={{ holder: { type: holder.type, colour: holder.colour }, svg: rightAlignSvg }} />
            </View>
          </View>

          <View style={[styles.single, styles.isRow]}>
            <View style={styles.single} onTouchEnd={() => this.swapOut('icing.type')}>
              <Svg visible={{ icing: { type: icing.type }, svg: leftAlignSvg }} />
            </View>
            <View style={styles.single} onTouchEnd={() => this.swapOut('icing.colour')}>
              <Svg visible={{ icing: { type: icing.type, colour: icing.colour }, svg: rightAlignSvg }} />
            </View>
          </View>

          {sprinkles && (sprinkles.type === 'salt' || sprinkles.type === 'sprinkles') ? (
            <View style={[styles.single, styles.isRow]}>
              <View style={styles.single} onTouchEnd={() => this.swapOut('sprinkles.type')}>
                <Svg visible={{ sprinkles: { type: sprinkles.type }, svg: { width: '100%', height: '100%', viewBox: '70 0 450 600' } }} />
              </View>
            </View>
          ) : (
              <View style={[styles.single, styles.isRow]}>
                <View style={styles.single} onTouchEnd={() => this.swapOut('sprinkles.type')}>
                  <Svg visible={{ sprinkles: { type: sprinkles.type }, svg: leftAlignSvg }} />
                </View>
                <View style={styles.single} onTouchEnd={() => this.swapOut('sprinkles.colour')}>
                  <Svg visible={{ sprinkles: { type: sprinkles.type, colour: sprinkles.colour }, svg: rightAlignSvg }} />
                </View>
              </View>
            )}

          <View style={[styles.single, styles.isRow]}>

            <View style={[styles.single, styles.halfSvg]} onTouchEnd={() => this.swapOut('optional')}>
              <Svg visible={{ icing: { type: icing.type, colour: icing.type }, optional: optional, topping: topping, svg: leftAlignSvg }} />
            </View>
            <View style={styles.single} onTouchEnd={() => this.swapOut('topping')}>
              <Svg visible={{ icing: { type: icing.type }, topping: topping, svg: rightAlignSvg }} />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222222',
    alignItems: 'center',
    justifyContent: 'center',
  },
  single: { flex: 1 },
  isRow: { flexDirection: 'row' },
  halfSvg: { overflow: 'hidden' }
});