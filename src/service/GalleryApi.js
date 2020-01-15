import Http from '@/http'

/**
 * 分类管理
 */
export default {
  // 一级分类
  getGallery () {
    const url = '/api/v1/gallery/all'
    return Http.post(url)
  },
  // 注册
  getCats (galleryId) {
    const url = '/api/v1/gallery/cats'
    return Http.post(url, {
      'id': galleryId
    })
  }
}
