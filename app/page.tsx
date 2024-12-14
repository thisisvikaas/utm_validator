'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

type Channel = {
  name: string
  rule: string
}

const GA4_CHANNELS: Channel[] = [
  {
    name: 'Affiliate',
    rule: 'Medium exactly matches "affiliate"'
  },
  {
    name: 'Audio',
    rule: 'Traffic is DV360 AND DV360 creative format is Audio'
  },
  {
    name: 'Display',
    rule: 'Medium contains "display", "banner", "expandable", "interstitial", "cpm" OR Traffic is Google Ads with Display Network'
  },
  {
    name: 'Email',
    rule: 'Source or Medium exactly matches "email", "e-mail", "e_mail" or "e mail"'
  },
  {
    name: 'Mobile Push Notifications',
    rule: 'Medium ends with push OR Medium contains "mobile"/"notification" OR Source is "firebase"'
  },
  {
    name: 'Organic Search',
    rule: 'Source is a search site OR Medium exactly matches "organic"'
  },
  {
    name: 'Organic Shopping',
    rule: 'Source is a shopping site OR Campaign contains "shop"/"shopping"'
  },
  {
    name: 'Organic Social',
    rule: 'Source is a social site OR Medium contains social variants'
  },
  {
    name: 'Organic Video',
    rule: 'Source is a video site OR Medium contains "video"'
  },
  {
    name: 'Paid Search',
    rule: 'Source is a search site AND Medium starts with "cp.", "ppc" or "paid"'
  },
  {
    name: 'Paid Shopping',
    rule: 'Source is shopping site OR Campaign has "shop"/"shopping" AND Medium starts with "cp.", "ppc" or "paid"'
  },
  {
    name: 'Paid Social',
    rule: 'Source is a social site AND Medium contains "cp", matches "ppc" or starts with "paid"'
  },
  {
    name: 'Paid Video',
    rule: 'Source is a video site AND Medium contains "cp" or matches "ppc"/"retargeting" or starts with "paid"'
  },
  {
    name: 'SMS',
    rule: 'Source or Medium exactly matches "sms"'
  }
]

const SEARCH_ENGINES = ['360.cn','alice','aol','ar.search.yahoo.com','ask','at.search.yahoo.com','auone','avg','babylon','baidu','biglobe.co.jp','biglobe.ne.jp','br.search.yahoo.com','centrum.cz','ch.search.yahoo.com','cl.search.yahoo.com','cnn','co.search.yahoo.com','comcast','daum','de.search.yahoo.com','dk.search.yahoo.com','dogpile','dogpile.com','duckduckgo','ecosia.org','email.seznam.cz','es.search.yahoo.com','espanol.search.yahoo.com','exalead.com','excite.com','fi.search.yahoo.com','firmy.cz','fr.search.yahoo.com','globo','go.mail.ru','google','google-play','in.search.yahoo.com','incredimail','it.search.yahoo.com','kvasir','lite.qwant.com','m.baidu.com','m.naver.com','m.sogou.com','mail.rambler.ru','malaysia.search.yahoo.com','msn','msn.com','mx.search.yahoo.com','najdi','naver.com','news.google.com','nl.search.yahoo.com','no.search.yahoo.com','ntp.msn.com','onet','pe.search.yahoo.com','ph.search.yahoo.com','pl.search.yahoo.com','play.google.com','qwant','qwant.com','rakuten','rakuten.co.jp','rambler','search-results','search.aol.co.uk','search.google.com','search.smt.docomo.ne.jp','search.ukr.net','secureurl.ukr.net','seznam','seznam.cz','sg.search.yahoo.com','so.com','sogou.com','sp-web.search.auone.jp','startsiden','startsiden.no','suche.aol.de','terra','tr.search.yahoo.com','tw.search.yahoo.com','uk.search.yahoo.com','ukr','virgilio','wap.sogou.com','webmaster.yandex.ru','websearch.rakuten.co.jp','yahoo','yahoo.co.jp','yahoo.com','yandex','yandex.by','yandex.com','yandex.fr','yandex.kz','yandex.ru','yandex.uz','zen.yandex.ru','au.search.yahoo.com','biglobe','bing','ca.search.yahoo.com','cn.bing.com','conduit','daum.net','eniro','hk.search.yahoo.com','id.search.yahoo.com','lens.google.com','lycos','m.search.naver.com','mail.yandex.ru','naver','nz.search.yahoo.com','onet.pl','rambler.ru','se.search.yahoo.com','search.aol.com','sogou','th.search.yahoo.com','tut.by','us.search.yahoo.com','vn.search.yahoo.com','yandex.com.tr','yandex.ua']
const SOCIAL_NETWORKS = ['43things','43things.com','5ch.net','Hatena','ImageShack','activerain','activerain.com','activeworlds','addthis','addthis.com','airg.ca','allnurses.com','alumniclass','alumniclass.com','ameba.jp','ameblo.jp','americantowns','americantowns.com','amp.reddit.com','ancestry.com','anobii.com','answerbag','answerbag.com','aolanswers','aolanswers.com','ar.pinterest.com','askubuntu','askubuntu.com','athlinks','athlinks.com','away.vk.com','b.hatena.ne.jp','baby-gaga','baby-gaga.com','babyblog.ru','badoo','bebo','bebo.com','beforeitsnews.com','bharatstudent','bharatstudent.com','biip.no','biswap.org','bit.ly','blackcareernetwork.com','blackplanet.com','blip.fm','blog.com','blog.goo.ne.jp','blog.naver.com','blogg.no','bloggang.com','blogger','blogger.com','blogher','blogher.com','bloglines.com','blogs.com','blogsome','blogspot','blogspot.com','blogster','blurtit','blurtit.com','bookmarks.yahoo.co.jp','br.pinterest.com','brightkite','brizzly','brizzly.com','business.facebook.com','buzzfeed.com','buzznet','buzznet.com','cafe.naver.com','cafemom','cafemom.com','camospace','camospace.com','canalblog.com','care2','care2.com','caringbridge.org','catster.com','cbnt.io','cellufun','centerblog.net','chegg.com','chicagonow.com','chiebukuro.yahoo.co.jp','classmates.com','classquest','classquest.com','co.pinterest.com','cocolog-nifty','cocolog-nifty.com','copainsdavant.linternaute.com','couchsurfing.org','cozycot','cross.tv','crunchyroll','crunchyroll.com','cyworld','cyworld.com','d.hatena.ne.jp','dailystrength.org','deluxe.com','deviantart','deviantart.com','dianping','dianping.com','digg.com','diigo','diigo.com','disqus','dogster.com','dol2day','dol2day.com','doostang.com','dopplr','dopplr.com','douban.com','draft.blogger.com','draugiem.lv','drugs-forum.com','dzone','dzone.com','elftown','elftown.com','epicurious.com']
const VIDEO_NETWORKS = ['blog.twitch.tv','crackle','curiositystream.com','d.tube','dailymotion','dashboard.twitch.tv','disneyplus','disneyplus.com','fast.wistia.net','help.netflix.com','hulu','hulu.com','id.twitch.tv','iq.com','iqiyi','iqiyi.com','jobs.netflix.com','justin.tv','m.twitch.tv','m.youtube.com','music.youtube.com','netflix','netflix.com','player.vimeo.com','ted','twitch.tv','utreon','veoh','veoh.com','viadeo.journaldunet.com','vimeo','wistia','wistia.com','youku','youku.com','youtube','youtube.com','crackle.com','curiositystream','dailymotion.com','help.hulu.com','player.twitch.tv','ted.com','twitch','utreon.com','vimeo.com']
const SHOPPING_NETWORKS = ['Google','aax-us-east.amazon-adsystem.com','aax.amazon-adsystem.com','alibaba.com','amazon','amazon.com','apps.shopify.com','checkout.shopify.com','checkout.stripe.com','cr.shopping.naver.com','cr2.shopping.naver.com','ebay','ebay.co.uk','ebay.com.au','ebay.de','etsy.com','m.alibaba.com','m.shopping.naver.com','mercadolibre','mercadolibre.com.ar','mercadolibre.com.mx','message.alibaba.com','msearch.shopping.naver.com','nl.shopping.net','no.shopping.net','offer.alibaba.com','one.walmart.com','order.shopping.yahoo.co.jp','s3.amazonaws.com','se.shopping.net','shopify','shopify.com','shopping.naver.com','shopping.yahoo.com','shopzilla','shopzilla.com','simplycodes.com','store.shopping.yahoo.co.jp','stripe','stripe.com','walmart','Shopping','IGShopping','alibaba','amazon.co.uk','ebay.com','etsy','mercadolibre.com','partners.shopify.com','shop.app','shopping.yahoo.co.jp','uk.shopping.net','walmart.com']

export default function Home() {
  const [url, setUrl] = useState('')
  const [parsedParams, setParsedParams] = useState<Record<string, string>>({})
  const [identifiedChannel, setIdentifiedChannel] = useState<string>('')

  const identifyChannel = (utmParams: Record<string, string>) => {
    const source = utmParams['utm_source']?.toLowerCase()
    const medium = utmParams['utm_medium']?.toLowerCase()
    const campaign = utmParams['utm_campaign']?.toLowerCase()

    if (!source && !medium) {
      return 'Direct'
    }

    // SMS
    if (source === 'sms' || medium === 'sms') {
      return 'SMS'
    }

    // Email
    const emailPatterns = ['email', 'e-mail', 'e_mail', 'e mail']
    if (emailPatterns.includes(source) || emailPatterns.includes(medium)) {
      return 'Email'
    }

    // Mobile Push Notifications
    if (source === 'firebase' || medium?.endsWith('push') || 
        medium?.includes('mobile') || medium?.includes('notification')) {
      return 'Mobile Push Notifications'
    }

    // Paid Video
    if (VIDEO_NETWORKS.includes(source) && 
        (medium?.includes('cp') || medium === 'ppc' || medium === 'retargeting' || medium?.startsWith('paid'))) {
      return 'Paid Video'
    }

    // Organic Video
    if (VIDEO_NETWORKS.includes(source) || medium?.includes('video')) {
      return 'Organic Video'
    }

    // Paid Shopping
    if ((SHOPPING_NETWORKS.includes(source) || campaign?.includes('shop') || campaign?.includes('shopping')) &&
        (medium?.startsWith('cp.') || medium?.startsWith('ppc') || medium?.startsWith('paid'))) {
      return 'Paid Shopping'
    }

    // Organic Shopping
    if (SHOPPING_NETWORKS.includes(source) || 
        (campaign && (campaign.includes('shop') || campaign.includes('shopping')))) {
      return 'Organic Shopping'
    }

    // Paid Social
    if (SOCIAL_NETWORKS.includes(source) && 
        (medium?.includes('cp') || medium === 'ppc' || medium?.startsWith('paid'))) {
      return 'Paid Social'
    }

    // Organic Social
    const socialMediumPatterns = ['social', 'social-network', 'social-media', 'sm', 'social network', 'social media']
    if (SOCIAL_NETWORKS.includes(source) || socialMediumPatterns.some(pattern => medium?.includes(pattern))) {
      return 'Organic Social'
    }

    // Paid Search
    if (SEARCH_ENGINES.includes(source) && 
        (medium?.startsWith('cp.') || medium?.startsWith('ppc') || medium?.startsWith('paid'))) {
      return 'Paid Search'
    }

    // Organic Search
    if (SEARCH_ENGINES.includes(source) || medium === 'organic') {
      return 'Organic Search'
    }

    // Display
    const displayPatterns = ['display', 'banner', 'expandable', 'interstitial', 'cpm']
    if (displayPatterns.some(pattern => medium?.includes(pattern))) {
      return 'Display'
    }

    // Affiliate
    if (medium === 'affiliate') {
      return 'Affiliate'
    }

    return 'Unassigned'
  }

  const parseUTMParams = (inputUrl: string) => {
    try {
      const urlObj = new URL(inputUrl)
      const utmParams: Record<string, string> = {}
      
      // Get all UTM parameters
      const searchParams = new URLSearchParams(urlObj.search)
      for (const [key, value] of searchParams.entries()) {
        if (key.startsWith('utm_')) {
          utmParams[key] = value
        }
      }
      
      setParsedParams(utmParams)
      setIdentifiedChannel(identifyChannel(utmParams))
    } catch (error) {
      setParsedParams({})
      setIdentifiedChannel('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      parseUTMParams(url)
    }
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value
    setUrl(newUrl)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-8">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Validate your UTM
          </h1>
          <p className="text-lg text-muted-foreground">
            Enter your URL with UTM parameters and press Enter to validate:
          </p>
        </div>

        <Input
          type="url"
          placeholder="https://example.com/?utm_source=google&utm_medium=cpc&utm_campaign=spring_sale"
          value={url}
          onChange={handleUrlChange}
          onKeyPress={handleKeyPress}
          className="w-full text-lg p-6"
        />

        {Object.keys(parsedParams).length > 0 && (
          <Card className="bg-green-50 border-0">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-semibold">Parsed UTM Parameters:</h2>
              <div className="space-y-2">
                {Object.entries(parsedParams).map(([key, value]) => (
                  <div key={key} className="flex items-start gap-2">
                    <span className="font-medium min-w-[120px]">{key.replace('utm_', '')}:</span>
                    <span className="text-muted-foreground">{value}</span>
                  </div>
                ))}
              </div>
              {identifiedChannel && (
                <div className="mt-4 p-4 bg-white rounded-lg">
                  <p className="font-semibold">Identified GA4 Channel:</p>
                  <p className="text-xl text-blue-600">{identifiedChannel}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-2xl font-bold">GA4 Default Channel Rules</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Channel</th>
                    <th className="text-left p-2">Rule</th>
                  </tr>
                </thead>
                <tbody>
                  {GA4_CHANNELS.map((channel) => (
                    <tr key={channel.name} className="border-b">
                      <td className="p-2 font-medium">{channel.name}</td>
                      <td className="p-2">{channel.rule}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

