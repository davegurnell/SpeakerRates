// @flow
import React from "react";
import { Dimensions } from "react-native";

type State = { window: { width: number, height: number } };

type Props = {
  children: (dimensions: State) => React.Element<*>
};

export default class WithDimensions extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      window: Dimensions.get("window")
    };
  }

  _change = ({ window }: *) => {
    this.setState({ window });
  };

  componentDidMount() {
    Dimensions.addEventListener("change", this._change);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this._change);
  }

  render() {
    return this.props.children(this.state);
  }
}
