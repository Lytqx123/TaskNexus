import { useToast } from 'hooks/use-toast';
import { normalizeShareUrl, shareEmbedCode } from 'data/tasknexus';
import { Eye, Files, SquareCode } from 'lucide-react';
import { Button } from 'modules/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from 'modules/components/ui/card';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from 'modules/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'modules/components/ui/tabs';
import Link from 'next/link';

export const InsightChat = ({ setHasLaunched, shareUrl }: {
	hasLaunched?: boolean;
	setHasLaunched: (value: boolean) => void;
	shareUrl?: string;
}) => {
	const linkText = normalizeShareUrl(shareUrl);
	const embedCode = shareEmbedCode(linkText);
	const { toast } = useToast();

	return (
		<div className='w-full h-full py-16 px-[16px] bg-gray-50 flex items-center justify-center'>
			<Card className='bg-white py-6 px-[16px] rounded-lg'>
				<CardHeader>
					<div className='flex items-center gap-4'>
						<img className='rounded-3xl' src='/apps/identicon.png' />
						<div className=''>
							<p className='text-gray-900 font-semibold text-2xl'>Insight Chat</p>
							<p className='text-gray-500'>
								Help with coding, debugging, and mastering development best practices. Your go-to
								tool for instant, expert support.
							</p>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<Tabs defaultValue='view'>
						<TabsList className='bg-transparent'>
							<TabsTrigger className='w-fit px-2' value='view' variant='underline'>
								<Eye />
							</TabsTrigger>
							<TabsTrigger className='w-fit px-2' value='embed' variant='underline'>
								<SquareCode />
							</TabsTrigger>
						</TabsList>
						<TabsContent value='view'>
							<div className='bg-gray-50 p-4 flex flex-col gap-6'>
								<div className='flex gap-[24px] text-xs justify-between'>
									<div className='flex flex-col gap-1'>
										<p className='font-medium'>App Visibility</p>
										<p className='text-gray-500'>Choose who can access your app</p>
									</div>
									<Select>
										<SelectTrigger className='w-[180px]'>
											<SelectValue placeholder='Visibility' />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='light'>Public</SelectItem>
											<SelectItem value='dark'>Private</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className='bg-white text-sm p-4 rounded-lg flex flex-col gap-2'>
									<p>Start using your app, please copy the code below.</p>
									<div className='flex items-center gap-2'>
										<p className='border border-gray-200 p-[10px] rounded-lg w-full'>{linkText || 'No shared link has been created yet.'}</p>
										<Button
											type='button'
											disabled={!linkText}
											onClick={() => {
												if (!linkText) return;
												navigator.clipboard
													.writeText(linkText)
													.then(() => {
														toast({
															title: 'Text copied'
														});
													})
													.catch(err => {
														console.error('Failed to copy text: ', err);
													});
											}}
											className='bg-white text-gray-900 hover:bg-white cursor-pointer'>
											<div className='flex items-center gap-1'>
												<Files />
												<p>Copy</p>
											</div>
										</Button>
									</div>
									{linkText ? <Link
										target='_blank'
										rel='noopener noreferrer'
										href={linkText}
										className='text-[#4F46E5] font-medium cursor-pointer'>
										Preview link in new tab
									</Link> : <Button type='button' disabled>Preview link in new tab</Button>}
								</div>
							</div>
						</TabsContent>
						<TabsContent className='bg-gray-50' value='embed'>
							<div className='space-y-4'>
								<div className='w-full bg-gray-800 flex flex-col rounded-lg gap-[10px]'>
									<Button
										type='button'
										disabled={!embedCode}
										onClick={() => {
											if (!embedCode) return;
											navigator.clipboard
												.writeText(embedCode)
												.then(() => {
													toast({
														title: 'Code copied to clipboard'
													});
												})
												.catch(err => {
													console.error('Failed to copy code: ', err);
												});
										}}
										className='rounded-t-lg text-gray-200 text-sm bg-gray-700 p-2 flex items-center gap-2 justify-between cursor-pointer'>
										<p>html</p>
										<div className='flex items-center gap-1'>
											<Files />
											<p>Copy code</p>
										</div>
									</Button>
									<div>
										<pre className='text-gray-100 p-4 rounded-lg overflow-x-auto'>
											<code>{embedCode || 'No shared link has been created yet.'}</code>
										</pre>
									</div>
								</div>
							</div>
						</TabsContent>
					</Tabs>
				</CardContent>
				<CardFooter className='flex justify-between items-center'>
					<Button
						onClick={() => setHasLaunched(false)}
						className='bg-white text-gray-900 hover:bg-white'>
						Back
					</Button>
					{linkText ? <Button asChild className='bg-gradient-to-r from-[#4F46E5] to-[#612D89] text-white'>
						<Link href={linkText} target='_blank' rel='noopener noreferrer'>Launch and Play &gt;</Link>
					</Button> : <Button type='button' disabled className='bg-gradient-to-r from-[#4F46E5] to-[#612D89] text-white'>Launch and Play &gt;</Button>}
				</CardFooter>
			</Card>
		</div>
	);
};
