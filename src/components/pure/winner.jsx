import React from 'react'

function WinnerComponent(props) {
    return (
      <div className='itemList'>&#xf091; {props.winner.prize.getName()}: &#xf007; {props.winner.winner.getName()}</div>
    );
}

export default WinnerComponent