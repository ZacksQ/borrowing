import React, { PureComponent } from 'react';
import banner from '../assets/banner模板@2x.png'
import { Carousel } from 'antd-mobile';

export default class Carouselc extends PureComponent {
  state = {
    data: ['1', '2', '3']
  }
  componentDidMount() {
    // simulate img loading
    setTimeout(() => {
      this.setState({
        data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
      });
    }, 100);
  }

  render() {
    return (<Carousel
      autoplay={true}
      infinite
      dots={false}
    >
      {this.state.data.map(val => (
        <a
          key={val}
          href="http://www.alipay.com"
          style={{ display: 'inline-block', width: '100%'}}
        >
          <img
            src={banner}
            alt=""
            style={{ width: '100%', verticalAlign: 'top' }}
            onLoad={() => {
              // fire window resize event to change height
              window.dispatchEvent(new Event('resize'));
              this.setState({ imgHeight: 'auto' });
            }}
          />
        </a>
      ))}
    </Carousel>)
  };
}