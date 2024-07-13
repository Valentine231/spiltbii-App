import React, { useState } from 'react';

const initialFriends = [
  {
    id: 118836,
    name: 'Clark',
    image: 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
  },
  {
    id: 933372,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 20,
  },
  {
    id: 499476,
    name: 'Anthony',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
  },
];

const Button = ({ children, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
};

const App = () => {
  const [Friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setshowAddFriend] = useState(false);
  const [selectedFriend, setselectedFriend] = useState(null);

  const handleshowFriend = () => {
    setshowAddFriend((show) => !show);
  };

  const handleaddfrind = (friend) => {
    setFriends((Friends) => [...Friends, friend]);
    setshowAddFriend(false);
  };

  const handleselection = (friend) => {
    // setselectedFriend(friend);
    setselectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setshowAddFriend(false);
  };

  const handlespiltbill = (value) => {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );

    setselectedFriend(null);
  };
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          Friends={Friends}
          selectedFriend={selectedFriend}
          onselect={handleselection}
        />

        {showAddFriend && <FormAddFriend onAddfriend={handleaddfrind} />}

        <Button onClick={handleshowFriend}>
          {showAddFriend ? 'close' : 'Add friend'}
        </Button>
      </div>
      {selectedFriend && (
        <FormspiltBill
          selectedFriend={selectedFriend}
          onspiltbill={handlespiltbill}
        />
      )}
    </div>
  );
};

const FriendList = ({ Friends, onselect, selectedFriend }) => {
  return (
    <ul>
      {Friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          selectedFriend={selectedFriend}
          onselect={onselect}
        />
      ))}
    </ul>
  );
};

const Friend = ({ friend, onselect, selectedFriend }) => {
  const isselected = selectedFriend?.id === friend.id;

  return (
    <li className={isselected ? 'selected' : ''}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}£
        </p>
      )}

      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}£
        </p>
      )}

      {friend.balance === 0 && <p>You and{friend.name} are even</p>}

      <Button onClick={() => onselect(friend)}>
        {isselected ? 'close' : 'select'}
      </Button>
    </li>
  );
};

const FormAddFriend = ({ onAddfriend }) => {
  const [name, setname] = useState('');
  const [image, setimage] = useState('https://i.pravatar.cc/48?u=499476');

  const handlesubmit = (e) => {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();

    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    onAddfriend(newFriend);

    setname('');
    setimage('https://i.pravatar.cc/48?u=499476');
  };

  return (
    <form className="form-add-friend" onSubmit={handlesubmit}>
      <label>👩🏽‍🤝‍👩🏾 Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setname(e.target.value)}
      />

      <label>🌄 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setimage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
};

const FormspiltBill = ({ selectedFriend, onspiltbill }) => {
  const [bill, setbill] = useState('');
  const [paidbyUser, setpaybyUser] = useState('');
  const paidbyFriend = bill ? bill - paidbyUser : '';
  const [whoIspaying, setwhoIspaying] = useState('user');

  const handlesubmit = (e) => {
    e.preventDefault();

    if (!bill || !paidbyUser) return;
    onspiltbill(whoIspaying === 'user' ? paidbyFriend : -paidbyUser);
  };
  return (
    <form className="form-spilt-bill" onSubmit={handlesubmit}>
      <h2>spilt a bill with {selectedFriend.name}</h2>
      <label>💰 Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setbill(Number(e.target.value))}
      />

      <label>🧍🏼 Your expenses</label>
      <input
        type="text"
        value={paidbyUser}
        onChange={(e) =>
          setpaybyUser(
            Number(e.target.value) > bill ? paidbyUser : Number(e.target.value)
          )
        }
      />

      <label>👩🏽‍🤝‍👩🏾{selectedFriend.name} expenses</label>
      <input type="text" disabled value={paidbyFriend} />

      <label>🤑 who is paying the bill</label>
      <select
        value={whoIspaying}
        onChange={(e) => setwhoIspaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>spiltbills</Button>
    </form>
  );
};
export default App;
