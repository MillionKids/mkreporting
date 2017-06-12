module.exports = [
  {
    _id: Math.round(Math.random() * 1000000),
    text: "Hello! Today's lesson will be on likes and dislikes! Type lesson to start learning.",
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'Developer',
      avatar: 'https://pbs.twimg.com/profile_images/692354435738161152/UAkVM9-p.png'
    },
  },
];