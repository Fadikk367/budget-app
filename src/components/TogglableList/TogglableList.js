import React, { useState } from 'react';

const Item = ({ item, onClickHandler, isActive}) => (
  <div>
    <item.Trigger onClick={onClickHandler} />
    {isActive ? item.children : null}
  </div>
)

const TogglableList = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState();
  return (
    <>
      {items.map(item => (
        <Item 
          key={item.id}
          item={item}
          onClickHandler={setSelectedItem}
          isActive={selectedItem === item.id}
        />
      ))}
    </>
  )
}

export default TogglableList
