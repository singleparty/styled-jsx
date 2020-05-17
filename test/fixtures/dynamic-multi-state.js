import React from 'react'

export default class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      color: 'red',
      fontSize: '20px'
    }
  }
  render() {
    return (
      <div>
        <style jsx>{`
          .a {
            color: ${this.state.color};
          }
        `}</style>
        <style jsx>{`
          .b {
            font-size: ${this.state.fontSize};
          }
        `}</style>
      </div>
    )
  }
}
