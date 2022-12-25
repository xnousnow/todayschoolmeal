interface filterMenu {
  name: string
  images: Array<string>
  description: string
}

const filterData: Array<filterMenu> = [
  {
    name: '바나나',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/4/46/Musa-sp3.1.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Banana_in_a_shop_-_Kerala_-_DJI_0185.jpg/640px-Banana_in_a_shop_-_Kerala_-_DJI_0185.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Banana_on_black_background.jpg/640px-Banana_on_black_background.jpg',
    ],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    name: '건파래',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Parae_%28Monostroma%29.jpg/640px-Parae_%28Monostroma%29.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Parae-muchim_2.jpg/640px-Parae-muchim_2.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Parae-muchim.jpg/640px-Parae-muchim.jpg',
    ],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
]

export default filterData
