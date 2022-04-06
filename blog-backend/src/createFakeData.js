import Post from './models/post';

export default function createFakeData() {
  // 0, 1, ...39로 이루어진 배열을 생성한 후 포스트 데이터로 변환
  const posts = [...Array(40).keys()].map(i => ({
    title: `post #${i}`,
    // https://www.lipsum.com/에서 복사한 200자 이상의 테스트
    body:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sodales consequat quam at porttitor. Curabitur facilisis enim quis vestibulum ornare. Nulla laoreet justo eget arcu fermentum, sed luctus nulla pulvinar. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed finibus sagittis libero scelerisque volutpat. Mauris augue lacus, vestibulum at ligula a, bibendum convallis justo. Praesent dictum orci vitae libero vehicula, sit amet mattis turpis posuere. Ut commodo vehicula metus, id vestibulum lectus. Pellentesque tempor lectus nec ornare fringilla. Morbi tincidunt lacus vitae mollis consequat. Morbi lacinia luctus urna non consectetur. Cras feugiat augue eu lorem vehicula feugiat. Praesent odio elit, egestas ac rutrum vestibulum, finibus quis nibh. Sed quis euismod diam. Nam id vestibulum elit, ac placerat nisl. Phasellus consectetur aliquam pharetra. Integer volutpat erat est, et rutrum est viverra eu. Vestibulum id libero quis felis fringilla vehicula laoreet ac felis. Mauris auctor ullamcorper metus vitae finibus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis erat erat, porta non sagittis eu, tempus sed metus. Vivamus felis quam, lacinia a est condimentum, suscipit bibendum velit. Duis non nisl elementum, finibus ipsum sit amet, viverra velit. Pellentesque a odio tincidunt, pulvinar orci mattis.',
    tags: ['fake', 'data']
  }));
  Post.insertMany(posts, (err, docs) => {
    console.log(docs);
  });
}