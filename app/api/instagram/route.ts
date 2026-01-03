import { NextResponse } from 'next/server'

export const revalidate = 3600 // Revalidate every hour

export async function GET() {
    console.log('Fetching Instagram data...')

    // 1. Get Token from Environment Variables
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN
    const userId = process.env.INSTAGRAM_USER_ID

    // Define fallback data
    const fallbackData = {
        posts: [
            { id: '1', media_url: '/logo.png', permalink: '#', caption: 'Follow us on Instagram @CADConcept3D', media_type: 'IMAGE' },
            { id: '2', media_url: '/logo.png', permalink: '#', caption: 'Innovative Designs using ZW3D', media_type: 'IMAGE' },
            { id: '3', media_url: '/logo.png', permalink: '#', caption: 'Engineering Excellence', media_type: 'IMAGE' },
            { id: '4', media_url: '/logo.png', permalink: '#', caption: 'Check out our latest projects', media_type: 'IMAGE' },
            { id: '5', media_url: '/logo.png', permalink: '#', caption: 'Precision and Quality', media_type: 'IMAGE' },
            { id: '6', media_url: '/logo.png', permalink: '#', caption: 'Contact us for more info', media_type: 'IMAGE' },
        ],
        profile: {
            username: 'CADConcept3D',
            posts_count: 124,
            followers_count: 5300,
            following_count: 1200,
            profile_picture_url: '/logo.png'
        }
    }

    // 2. Check if Token exists or is placeholder
    if (!accessToken || accessToken === 'your_long_lived_token_here') {
        console.warn('INSTAGRAM_ACCESS_TOKEN is missing or invalid. Returning fallback data.')
        return NextResponse.json(fallbackData)
    }

    try {
        // 3. Fetch Data from Instagram Basic Display API
        // First, get the media list
        const mediaUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username&access_token=${accessToken}`

        const mediaRes = await fetch(mediaUrl)

        if (!mediaRes.ok) {
            const errorData = await mediaRes.json()
            console.error('Instagram API Error:', errorData)
            // Instead of throwing 500, return fallback data so the UI doesn't look broken
            console.warn('Fetching from Instagram failed, returning fallback data.')
            return NextResponse.json(fallbackData)
        }

        const mediaData = await mediaRes.json()

        // 4. Transform Data
        const posts = mediaData.data.slice(0, 6).map((item: any) => ({
            id: item.id,
            media_url: item.media_type === 'VIDEO' ? item.thumbnail_url : item.media_url,
            permalink: item.permalink,
            caption: item.caption,
            media_type: item.media_type
        }))

        // Optionally fetch profile data
        const profile = {
            username: mediaData.data[0]?.username || 'CADConcept3D',
            posts_count: 124, // Mocked as API doesn't provide
            followers_count: 5300, // Mocked
            following_count: 1200, // Mocked
            profile_picture_url: ''
        }

        return NextResponse.json({ posts, profile })

    } catch (error) {
        console.error('Server Instagram Fetch Error:', error)
        // Return fallback data on generic error too
        return NextResponse.json(fallbackData)
    }
}
