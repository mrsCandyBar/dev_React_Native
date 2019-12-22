import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg from './components/svg';
import { findIndex, get, set } from 'lodash';

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
  }
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
      }
    }
  }

  private swapOut = optionType => {
    const allOptions = get(this.state.options, optionType);
    const selectedOption = get(this.state.cupcake, optionType);
    const activeIndex = findIndex(allOptions, option => option === selectedOption);

    let updateState = this.state.cupcake;
    set(updateState, optionType, allOptions[(activeIndex == allOptions.length - 1) ? 0 : activeIndex + 1]);
    this.setState({
      cupcake: { ...updateState }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 8, flexDirection: 'row' }}>
          <Svg visible={this.state.cupcake} />
        </View>

        <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#161616', paddingBottom: 5 }}>
          <View style={{ flex: 1 }} onTouchStart={() => this.swapOut('flavour')}>
            <Svg visible={{ flavour: "vanilla" }} />
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1, overflow: "hidden" }} onTouchStart={() => this.swapOut('holder.type')}>
              <Svg visible={{ holder: { type: this.state.cupcake.holder.type }, svg: { width: '200%', height: '100%', viewBox: '80 0 450 600' } }} />
            </View>
            <View style={{ flex: 1, overflow: "hidden" }} onTouchStart={() => this.swapOut('holder.colour')}>
              <Svg visible={{ holder: { type: this.state.cupcake.holder.type, colour: this.state.cupcake.holder.colour }, svg: { width: '200%', height: '100%', viewBox: '300 0 450 600' } }} />
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1 }} onTouchStart={() => this.swapOut('icing.type')}>
              <Svg visible={{ icing: { type: this.state.cupcake.icing.type }, svg: { width: '200%', height: '100%', viewBox: '80 0 450 600' } }} />
            </View>
            <View style={{ flex: 1 }} onTouchStart={() => this.swapOut('icing.colour')}>
              <Svg visible={{ icing: { type: this.state.cupcake.icing.type, colour: this.state.cupcake.icing.colour }, svg: { width: '200%', height: '100%', viewBox: '300 0 450 600' } }} />
            </View>
          </View>
          {this.state.cupcake.sprinkles && (this.state.cupcake.sprinkles.type === 'salt' || this.state.cupcake.sprinkles.type === 'sprinkles') ? (
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flex: 1 }} onTouchStart={() => this.swapOut('sprinkles.type')}>
                <Svg visible={{ sprinkles: { type: this.state.cupcake.sprinkles.type }, svg: { width: '100%', height: '100%', viewBox: '70 0 450 600' } }} />
              </View>
            </View>
          ) : (
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1 }} onTouchStart={() => this.swapOut('sprinkles.type')}>
                  <Svg visible={{ sprinkles: { type: this.state.cupcake.sprinkles.type }, svg: { width: '200%', height: '100%', viewBox: '70 0 450 600' } }} />
                </View>
                <View style={{ flex: 1 }} onTouchStart={() => this.swapOut('sprinkles.colour')}>
                  <Svg visible={{ sprinkles: { type: this.state.cupcake.sprinkles.type, colour: this.state.cupcake.sprinkles.colour }, svg: { width: '200%', height: '100%', viewBox: '300 0 450 600' } }} />
                </View>
              </View>
            )}

          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1 }} onTouchStart={() => this.swapOut('topping')}>
              <Svg visible={{ icing: { type: this.state.cupcake.icing.type }, topping: this.state.cupcake.topping, svg: { width: '200%', height: '100%', viewBox: '80 0 450 600' } }} />
            </View>
            <View style={{ flex: 1 }} onTouchStart={() => this.swapOut('optional')}>
              <Svg visible={{ icing: { type: this.state.cupcake.icing.type, colour: this.state.cupcake.icing.type }, optional: this.state.cupcake.optional, svg: { width: '200%', height: '100%', viewBox: '300 0 450 600' } }} />
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
});
