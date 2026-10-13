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

interface PasswordResetProps {
	passwordResetURL: string;
}

const PasswordResetEmail = ({ passwordResetURL }: PasswordResetProps) => {
	return (
		<Html>
			<Head />
			<Preview>TaskNexus Password Reset</Preview>

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
									TaskNexus Password Reset Request
								</Heading>
								<Text className='text-gray-800 mb-4 text-left'>
									We received a request to reset your password for your TaskNexus account. Please
									click the link below to reset your password
								</Text>

								<Button
									href={passwordResetURL}
									className='bg-indigo-700 text-white px-5 py-3 rounded-lg mt-4'
								>
									Reset Password
								</Button>

								<Text className='text-gray-800 mb-4 text-left mt-4'>
									If you did not request a password reset, please ignore this email or contact our
									support team for assistance.
								</Text>

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

export default PasswordResetEmail;
