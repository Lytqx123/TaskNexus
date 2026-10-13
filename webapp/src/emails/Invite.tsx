import {
	Body,
	Button,
	Container,
	Font,
	Head,
	Heading,
	Html,
	Img,
	Preview,
	Section,
	Tailwind,
	Text
} from '@react-email/components';
import dotenv from 'dotenv';
import * as React from 'react';
dotenv.config({ path: '.env' });

interface InviteProps {
	name: string;
	inviteURL: string;
	teamName: string;
}

const InviteEmail = ({ inviteURL, name, teamName }: InviteProps) => {
	return (
		<Html>
			<Head />
			<Preview>TaskNexus Invitation</Preview>

			<Tailwind>
				<Font
					fontFamily='Inter'
					fontWeight={400}
					fontStyle='normal'
					webFont={{
						url: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
						format: 'woff2'
					}}
					fallbackFontFamily='sans-serif'
				/>
				<Body className='bg-white text-gray-900 pt-8'>
					<Container className='p-5 mx-auto bg-gray-50'>
						<Section className='bg-white'>
							<Section className='py-5'>
								<Img
									src={`${process.env.URL_APP}/images/email/logo-light.png`}
									height='50'
									alt='TaskNexus logo'
									className='mx-auto'
								/>
							</Section>
							<Section className='p-6 text-center'>
								<Heading className='text-gray-800 font-bold text-xl mb-4 text-left'>
									Hi {name},
								</Heading>
								<Text className='text-gray-800 mb-4 text-left'>
									You have been invited to join {teamName} on TaskNexus. To accept the invitation
									and set up your account, please click the link below.
								</Text>

								<Button
									href={inviteURL}
									className='bg-indigo-700 text-white px-5 py-3 rounded-lg my-4'
								>
									Accept & Join Team
								</Button>

								<Text className='text-gray-800 text-left'>
									Thank you,
									<br />
									TaskNexus Team
								</Text>
							</Section>
						</Section>
						<Section>
							<Text className='text-gray-500'>© TaskNexus</Text>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

export default InviteEmail;
