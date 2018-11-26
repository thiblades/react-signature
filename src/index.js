import React, { Component } from 'react'
import PropTypes from 'prop-types'

// material-ui
import Button from '@material-ui/core/Button'
import { SketchField, Tools } from 'react-sketch'
import Grid from '@material-ui/core/Grid'

import styles from './styles.css'

export default class ExampleComponent extends Component {
  static propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    signature: PropTypes.any,
    onSignatureReady: PropTypes.func
  };

  state = {
    value: null
  };

  onSubmit() {
    this.sketch.clear()
    this.setState({
      value: null
    })
  }

  download() {
    const { onSignatureReady } = this.props
    if (onSignatureReady) onSignatureReady(this.sketch.toDataURL(), new Date())
    this.sketch.clear()
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    })
  }

  render() {
    const {
      height, width, signature
    } = this.props

    const { value } = this.state

    return (
      <div style={{ width, height: height + 50 }}>

        {
          signature
            ? (
              <img
                alt='signatureImage'
                src={signature}
                className={styles.image}
                style={{
                  height,
                  width
                }}
              />
            )
            : (
              <div
                className={styles.signatureBlock}
                style={{
                  height,
                  width
                }}
              >
                <SketchField
                  ref={(c) => { this.sketch = c }}

                  width={width}
                  height={height}
                  tool={Tools.Pencil}
                  lineColor='black'
                  lineWidth={3}
                  // eslint-disable-next-line react/jsx-no-bind
                  onChange={this.handleChange.bind(this)}
                  value={value}
                  imageFormat='png'
                />
                <Grid
                  container
                  justify='flex-end'
                  spacing={16}
                  className={styles.grid}
                >
                  <Grid item>
                    <Button
                      variant='contained'
                      margin='10px'
                      // eslint-disable-next-line react/jsx-no-bind
                      onClick={this.onSubmit.bind(this)}
                    >
                      Reset
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant='contained'
                      color='primary'
                      // eslint-disable-next-line react/jsx-no-bind
                      onClick={this.download.bind(this)}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </div>
            )
        }
      </div>
    )
  }
}
