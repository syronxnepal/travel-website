import { useState, useEffect } from 'react'
import { pagesApi } from '../services/api'
import { getImageUrl } from '../utils/helpers'

// Fetches the CMS-managed title/subtitle/banner image for a page (managed
// under CMS > Pages), falling back to the given defaults when the page
// hasn't been configured yet, isn't published, or the API is unreachable.
export function usePageHero(pageType, defaults) {
  const [hero, setHero] = useState(defaults)

  useEffect(() => {
    pagesApi.getByType(pageType)
      .then((res) => {
        const data = res?.data || res
        if (data?.status === 'published' && data.heading) {
          setHero({
            title: data.heading,
            subtitle: data.topTitle || '',
            backgroundImage: getImageUrl(data.image) || defaults.backgroundImage,
          })
        }
      })
      .catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageType])

  return hero
}
