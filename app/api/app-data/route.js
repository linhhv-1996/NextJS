import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const packageName = searchParams.get('packageName');

    // TODO: Implement actual API call to fetch app data
    // This is a placeholder response
    const mockData = {
        info: {
            title: 'Google Translate',
            description: 'Translate between 103 languages by typing\r\n...',
            descriptionHTML: 'Translate between 103 languages by typing<br>...',
            summary: 'The world is closer than ever with over 100 languages',
            installs: '500,000,000+',
            minInstalls: 500000000,
            maxInstalls: 898626813,
            score: 4.482483,
            scoreText: '4.5',
            ratings: 6811669,
            reviews: 1614618,
            price: 0,
            free: true,
            currency: 'USD',
            priceText: 'Free',
            offersIAP: false,
            IAPRange: undefined,
            androidVersion: 'VARY',
            androidVersionText: 'Varies with device',
            androidMaxVersion: 'VARY',
            developer: 'Google LLC',
            developerId: '5700313618786177705',
            developerEmail: 'translate-android-support@google.com',
            developerWebsite: 'http://support.google.com/translate',
            developerAddress: '1600 Amphitheatre Parkway, Mountain View 94043',
        },
        reviews: [
            {
                userName: 'Inga El-Ansary',
                date: '2013-11-10T18:31:42.174Z',
                score: 5,
                title: 'I LOVE IT',
                text: 'It has skins and snowballs everything I wanted its so cool I love it!!!!!!!!',
                replyDate: '2013-11-10T18:31:42.174Z',
                replyText: 'thanks for playing Panda vs Zombies!',
                version: '1.0.2',
            },
            {
                userName: 'Inga El-Ansary',
                date: '2013-11-10T18:31:42.174Z',
                score: 5,
                title: 'I LOVE IT',
                text: 'It has skins and snowballs everything I wanted its so cool I love it!!!!!!!!',
                replyDate: '2013-11-10T18:31:42.174Z',
                replyText: 'thanks for playing Panda vs Zombies!',
                version: '1.0.2',
            },
            {
                userName: 'Inga El-Ansary',
                date: '2013-11-10T18:31:42.174Z',
                score: 5,
                title: 'I LOVE IT',
                text: 'It has skins and snowballs everything I wanted its so cool I love it!!!!!!!!',
                replyDate: '2013-11-10T18:31:42.174Z',
                replyText: 'thanks for playing Panda vs Zombies!',
                version: '1.0.2',
            },
            {
                userName: 'Inga El-Ansary',
                date: '2013-11-10T18:31:42.174Z',
                score: 5,
                title: 'I LOVE IT',
                text: 'It has skins and snowballs everything I wanted its so cool I love it!!!!!!!!',
                replyDate: '2013-11-10T18:31:42.174Z',
                replyText: 'thanks for playing Panda vs Zombies!',
                version: '1.0.2',
            },
            {
                userName: 'Inga El-Ansary',
                date: '2013-11-10T18:31:42.174Z',
                score: 5,
                title: 'I LOVE IT',
                text: 'It has skins and snowballs everything I wanted its so cool I love it!!!!!!!!',
                replyDate: '2013-11-10T18:31:42.174Z',
                replyText: 'thanks for playing Panda vs Zombies!',
                version: '1.0.2',
            },
            {
                userName: 'Inga El-Ansary',
                date: '2013-11-10T18:31:42.174Z',
                score: 5,
                title: 'I LOVE IT',
                text: 'It has skins and snowballs everything I wanted its so cool I love it!!!!!!!!',
                replyDate: '2013-11-10T18:31:42.174Z',
                replyText: 'thanks for playing Panda vs Zombies!',
                version: '1.0.2',
            },
            {
                userName: 'Inga El-Ansary',
                date: '2013-11-10T18:31:42.174Z',
                score: 5,
                title: 'I LOVE IT',
                text: 'It has skins and snowballs everything I wanted its so cool I love it!!!!!!!!',
                replyDate: '2013-11-10T18:31:42.174Z',
                replyText: 'thanks for playing Panda vs Zombies!',
                version: '1.0.2',
            },
            {
                userName: 'Inga El-Ansary',
                date: '2013-11-10T18:31:42.174Z',
                score: 5,
                title: 'I LOVE IT',
                text: 'It has skins and snowballs everything I wanted its so cool I love it!!!!!!!!',
                replyDate: '2013-11-10T18:31:42.174Z',
                replyText: 'thanks for playing Panda vs Zombies!',
                version: '1.0.2',
            },
            
        ],
    };

    return NextResponse.json(mockData);
}

