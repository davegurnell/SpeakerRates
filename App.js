import React from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import WithDimensions from './WithDimensions'
import SideMenu from 'react-native-side-menu'

const pressRetentionOffset = { top: 500, bottom: 500, left: 500, right: 500 }

const Button = ({ style, onPress, label, labelStyle }) =>
  <TouchableOpacity style={[ styles.button, style ]} onPress={onPress} pressRetentionOffset={pressRetentionOffset}>
    <Text style={[ styles.label, labelStyle || {} ]}>{ label }</Text>
  </TouchableOpacity>

export default class App extends React.Component {
  state = { happy: 0, neutral: 0, unhappy: 0 }

  onPressHappy = () => {
    this.setState({ ...this.state, happy: this.state.happy + 1 })
  }

  onPressNeutral = () => {
    this.setState({ ...this.state, neutral: this.state.neutral + 1 })
  }

  onPressUnhappy = () => {
    this.setState({ ...this.state, unhappy: this.state.unhappy + 1 })
  }

  onPressReset = () => {
    this.setState({ ...this.state, happy: 0, neutral: 0, unhappy: 0 })
  }

  render() {
    const { happy, neutral, unhappy } = this.state

    return (
      <WithDimensions>{ ({ window }) => {
        const orientationStyle = {
          flexDirection: window.width < window.height ? 'column' : 'row'
        }

        const menu = (
          <View style={[styles.buttonContainer, orientationStyle]}>
            <View style={[styles.button, styles.happyScore]}><Text style={styles.label}>{happy}</Text></View>
            <View style={[styles.button, styles.neutralScore]}><Text style={styles.label}>{neutral}</Text></View>
            <View style={[styles.button, styles.unhappyScore]}><Text style={styles.label}>{unhappy}</Text></View>
            <Button style={styles.resetButton} labelStyle={styles.resetLabel} onPress={this.onPressReset} label='⏪' />
          </View>
        )

        return (
          <SideMenu menu={menu} menuPosition="right" style={styles.rootContainer}>
            <View style={[ styles.buttonContainer, orientationStyle ]}>
              <Button style={[styles.button, styles.happyButton]} onPress={this.onPressHappy} label={'😀'} />
              <Button style={[styles.button, styles.neutralButton]} onPress={this.onPressNeutral} label={'😐'} />
              <Button style={[styles.button, styles.unhappyButton]} onPress={this.onPressUnhappy} label={'☹️'} />
            </View>
          </SideMenu>
        )
      }}</WithDimensions>
    )
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: '#000',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  button: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  happyButton: { backgroundColor: '#0c0' },
  neutralButton: { backgroundColor: '#fa0' },
  unhappyButton: { backgroundColor: '#c00' },
  happyScore: { backgroundColor: '#060' },
  neutralScore: { backgroundColor: '#850' },
  unhappyScore: { backgroundColor: '#600' },
  label: { color: '#fff', fontSize: 100 },
  resetButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 'auto',
    backgroundColor: 'transparent',
  },
  resetLabel: { fontSize: 60 },
})
