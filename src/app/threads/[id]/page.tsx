// 'use client';
//
// import React, { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { useAppSelector } from '@/store/hooks';
// import { Header, Sidebar, Layout, LayoutMobile } from '@/components/layout';
// import { ThreadModel } from '@/features/threads/components/ThreadModel';
// import { LoginRequiredModal } from '@/components/modals';
// import { useIsMobile } from '@/hooks/useIsMobile';
//
// const ThreadDetailPage = () => {
//   const isMobile = useIsMobile();
//   const router = useRouter();
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [isHydrated, setIsHydrated] = useState(false);
//   const params = useParams();
//   const threadId = params.id as string;
//
//   // Get auth state from Redux
//   const { isAuthenticated, user } = useAppSelector((state) => state.auth);
//
//   useEffect(() => {
//     setIsHydrated(true);
//   }, []);
//
//   // Show login modal if unauthenticated on desktop after hydration
//   useEffect(() => {
//     if (isHydrated && !isAuthenticated && !isMobile) {
//       setShowLoginModal(true);
//     }
//   }, [isAuthenticated, isMobile, isHydrated]);
//
//   // Mock thread data
//   const mockThread = {
//     id: threadId,
//     author: {
//       id: 'user-1',
//       name: 'Sarah Johnson',
//       handle: 'sarahj',
//       initials: 'SJ',
//       avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
//     },
//     content: 'Just launched my new project! So excited to share it with the community. Check it out and let me know what you think! This is a longer post with more details about the amazing features we\'ve built. 🚀',
//     image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
//     timestamp: '2 hours ago',
//     likes: 234,
//     replies: 45,
//     reposts: 67,
//     isLiked: false,
//   };
//
//   const mockComments = [
//     {
//       id: '1',
//       author: {
//         id: 'user-2',
//         name: 'Alex Chen',
//         handle: 'alexchen',
//         initials: 'AC',
//         avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
//       },
//       content: 'This looks amazing! I\'d love to try it out. Great work on the design!',
//       timestamp: '1 hour ago',
//       likes: 45,
//       replies: 3,
//       isLiked: false,
//     },
//     {
//       id: '2',
//       author: {
//         id: 'user-3',
//         name: 'Maria Garcia',
//         handle: 'mgarcia',
//         initials: 'MG',
//         avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria',
//       },
//       content: 'The UI is clean and intuitive. Can\'t wait to see this in production!',
//       timestamp: '45 minutes ago',
//       likes: 32,
//       replies: 2,
//       isLiked: false,
//     },
//   ];
//
//   // Prepare current user data
//   const currentUser = user
//     ? {
//         name: user.name,
//         id: user.id,
//         avatar: user.avatarUrl || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default',
//       }
//     : {
//         name: 'Guest',
//         id: '',
//         avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=guest',
//       };
//
//   // Redirect unauthenticated mobile users
//   if (isHydrated && !isAuthenticated && isMobile) {
//     return (
//       <LayoutMobile>
//         <div className="flex flex-col items-center justify-center min-h-screen bg-[#101010] text-center px-4 py-8">
//           <h1 className="text-2xl font-bold text-white mb-4">Login Required</h1>
//           <p className="text-gray-400 mb-6">
//             You need to log in to view this thread.
//           </p>
//           <button
//             onClick={() => router.push('/login')}
//             className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition duration-200"
//           >
//             Go to Login
//           </button>
//         </div>
//       </LayoutMobile>
//     );
//   }
//
//   // Desktop layout
//   if (isHydrated && !isMobile) {
//     return (
//       <>
//         <Layout
//           header={<Header user={currentUser} onMenuClick={() => setSidebarOpen(!sidebarOpen)} />}
//           sidebar={<Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} user={currentUser} />}
//         >
//           <ThreadDetail threadId={threadId} thread={mockThread} comments={mockComments} />
//         </Layout>
//         {showLoginModal && !isAuthenticated && (
//           <LoginRequiredModal onClose={() => setShowLoginModal(false)} />
//         )}
//       </>
//     );
//   }
//
//   // Mobile layout
//   if (isHydrated && isMobile) {
//     return (
//       <LayoutMobile>
//         <div className="pb-20">
//           <ThreadDetail threadId={threadId} thread={mockThread} comments={mockComments} />
//         </div>
//       </LayoutMobile>
//     );
//   }
//
//   // Loading state
//   return <div className="w-full h-screen bg-[#101010]" />;
// };
//
// export default ThreadDetailPage;
//
