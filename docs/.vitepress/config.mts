import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "雪人FE",
  description: "前端学习知识库，涵盖「学习笔记 + 学习路线 + 面试指南」",
  head: [
    ['link', { rel: 'icon', href: 'https://snowblogimg-1309537252.cos.ap-nanjing.myqcloud.com/SnowmanFE/logo.png' }]
  ],
  themeConfig: {
    logo: 'https://snowblogimg-1309537252.cos.ap-nanjing.myqcloud.com/SnowmanFE/logo.png',
    nav: [
      { text: '🏠 首页', link: '/' },
      { text: '📖 面试宝典', link: '/interview' }
    ],
    sidebar: {
      '/interview': [
        {
          text: '面试题',
          collapsed: false,
          items: [
            {
              text: '前端',
              collapsed: false,
              items: [
                { text: 'HTML', link: '/interview/fe/html' },
                { text: 'CSS', link: '/interview/fe/css' },
                { text: 'JavaScript', link: '/interview/fe/javascript' },
                { text: 'TypeScript', link: '/interview/fe/typescript' },
                { text: 'Vue', link: '/interview/fe/vue' },
                { text: 'React', link: '/interview/fe/react' },
                { text: '浏览器', link: '/interview/fe/browser' },
                { text: '手写题', link: '/interview/fe/handwrite' },
                { text: '场景题', link: '/interview/fe/scene' },
              ]
            },
            {
              text: '计算机网络',
              collapsed: true,
              items: [
                { text: '基础知识', link: '/interview/network/base' },
                { text: '应用层(HTTP)', link: '/interview/network/http' },
                { text: '传输层(TCP)', link: '/interview/network/tcp' },
                { text: '网络层(IP)', link: '/interview/network/ip' },
              ]
            },
            {
              text: '算法',
              link: '/interview/algorithm'
            },
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/LonelySnowman' }
    ]
  }
})
