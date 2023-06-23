import * as React from 'react';
import { render } from 'react-dom';
import { RedocStandalone } from '../src';
import jsonurl from 'json-url';

class DemoApp extends React.Component<
  Record<string, unknown>,
  { spec: object | undefined; specUrl: string | undefined; dropdownOpen: boolean; cors: boolean }
> {
  constructor(props) {
    super(props);

    this.state = {
      spec: undefined,
      specUrl: undefined,
      dropdownOpen: false,
      cors: false,
    };
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    const hash = window.location.hash.substring(1);
    if (hash) {
      const hashParams = new URLSearchParams(hash);
      if (hashParams.has('spec')) {
        const spec = hashParams.get('spec');
        const codec = jsonurl('lzma');
        const decompressedSpec = await codec.decompress(spec);
        this.setState({
          spec: decompressedSpec,
          specUrl: undefined,
          dropdownOpen: false,
          cors: false,
        });
      }
    }
  }

  render() {
    return (
      <>
        <RedocStandalone
          spec={this.state.spec}
          options={{ scrollYOffset: 'nav', untrustedSpec: true }}
        />
      </>
    );
  }
}

render(<DemoApp />, document.getElementById('container'));
