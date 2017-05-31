module.exports = [
  {
    _id: Math.round(Math.random() * 1000000),
    text: 'Hello! We are Million Kids and we are here to help :) If anyone has asked you to send something inapropriate online, you can report them by typing "Report."',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'Developer',
      avatar: 'https://pbs.twimg.com/profile_images/692354435738161152/UAkVM9-p.png'
    },
  },
];
