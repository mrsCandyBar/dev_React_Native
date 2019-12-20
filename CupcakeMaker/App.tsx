import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
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

    console.log("state >>>", optionType, selectedOption, updateState)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 8, flexDirection: 'row' }}>
          <Svg visible={this.state.cupcake} />
        </View>

        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1, backgroundColor: '#999999' }} onTouchStart={() => this.swapOut('flavour')} />
          <View style={{ flex: 1, backgroundColor: '#888888' }} onTouchStart={() => this.swapOut('holder.type')} />
          <View style={{ flex: 1, backgroundColor: '#777777' }} onTouchStart={() => this.swapOut('holder.colour')} />
          <View style={{ flex: 1, backgroundColor: '#666666' }} onTouchStart={() => this.swapOut('icing.colour')} />
          <View style={{ flex: 1, backgroundColor: '#555555' }} onTouchStart={() => this.swapOut('icing.type')} />
          <View style={{ flex: 1, backgroundColor: '#444444' }} onTouchStart={() => this.swapOut('sprinkles.type')} />
          <View style={{ flex: 1, backgroundColor: '#333333' }} onTouchStart={() => this.swapOut('sprinkles.colour')} />
          <View style={{ flex: 1, backgroundColor: '#222222' }} onTouchStart={() => this.swapOut('topping')} />
          <View style={{ flex: 1, backgroundColor: '#111111' }} onTouchStart={() => this.swapOut('optional')} />
        </View>

        {/*
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1, backgroundColor: '#222222' }} onTouchStart={() => this.swapOut('flavour')}>
            <Svg visible={{
              flavour: "vanilla",
              holder: { type: this.state.cupcake.holder.type, colour: "transparent" },
              icing: { type: this.state.cupcake.icing.type, colour: "transparent" },
              sprinkles: { type: 'salt-single', colour: "transparent" }
            }
            } />
          </View>
          <View style={{ flex: 1, backgroundColor: '#222222' }} onTouchStart={() => this.swapOut('holder.type')}>
            <Svg visible={{
              flavour: "transparent",
              holder: { type: this.state.cupcake.holder.type, colour: this.state.cupcake.holder.colour },
              icing: { type: this.state.cupcake.icing.type, colour: "transparent" },
              sprinkles: { type: 'salt-single', colour: "transparent" }
            }
            } />
          </View>
          <View style={{ flex: 1, backgroundColor: '#222222' }} onTouchStart={() => this.swapOut('holder.colour')}>
            <Svg visible={{
              flavour: "transparent",
              holder: { type: this.state.cupcake.holder.type, colour: this.state.cupcake.holder.colour },
              icing: { type: this.state.cupcake.icing.type, colour: "transparent" },
              sprinkles: { type: 'salt-single', colour: "transparent" }
            }
            } />
          </View>
          <View style={{ flex: 1, backgroundColor: '#222222' }} onTouchStart={() => this.swapOut('icing.colour')}>
            <Svg visible={{
              flavour: "transparent",
              holder: { type: this.state.cupcake.holder.type, colour: 'transparent' },
              icing: { type: this.state.cupcake.icing.type, colour: this.state.cupcake.icing.colour },
              sprinkles: { type: 'salt-single', colour: "transparent" }
            }
            } />
          </View>
          <View style={{ flex: 1, backgroundColor: '#222222' }} onTouchStart={() => this.swapOut('icing.type')}>
            <Svg visible={{
              flavour: "transparent",
              holder: { type: this.state.cupcake.holder.type, colour: 'transparent' },
              icing: { type: this.state.cupcake.icing.type, colour: this.state.cupcake.icing.colour },
              sprinkles: { type: 'salt-single', colour: "transparent" }
            }
            } />
          </View>
          <View style={{ flex: 1, backgroundColor: '#222222' }} onTouchStart={() => this.swapOut('sprinkles.type')}>
            <Svg visible={{
              flavour: "transparent",
              holder: { type: this.state.cupcake.holder.type, colour: 'transparent' },
              icing: { type: this.state.cupcake.icing.type, colour: 'transparent' },
              sprinkles: { type: this.state.cupcake.sprinkles.type, colour: this.state.cupcake.sprinkles.colour }
            }
            } />
          </View>
          <View style={{ flex: 1, backgroundColor: '#222222' }} onTouchStart={() => this.swapOut('sprinkles.colour')}>
            <Svg visible={{
              flavour: "transparent",
              holder: { type: this.state.cupcake.holder.type, colour: 'transparent' },
              icing: { type: this.state.cupcake.icing.type, colour: 'transparent' },
              sprinkles: { type: this.state.cupcake.sprinkles.type, colour: this.state.cupcake.sprinkles.colour }
            }
            } />
          </View>
          <View style={{ flex: 1, backgroundColor: '#222222' }} onTouchStart={() => this.swapOut('topping')}>
            <Svg visible={{
              flavour: "transparent",
              holder: { type: this.state.cupcake.holder.type, colour: 'transparent' },
              icing: { type: this.state.cupcake.icing.type, colour: 'transparent' },
              sprinkles: { type: 'salt-single', colour: 'transparent' },
              topping: this.state.cupcake.topping
            }
            } />
          </View>
          <View style={{ flex: 1, backgroundColor: '#222222' }} onTouchStart={() => this.swapOut('optional')}>
            <Svg visible={{
              flavour: "transparent",
              holder: { type: this.state.cupcake.holder.type, colour: 'transparent' },
              icing: { type: this.state.cupcake.icing.type, colour: 'transparent' },
              sprinkles: { type: 'salt-single', colour: 'transparent' },
              optional: this.state.cupcake.optional
            }
            } />
          </View>
          </View>*/}
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
