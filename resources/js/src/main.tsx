import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css';

// Tailwind css
import './tailwind.css';

// i18n (needs to be bundled)
import './i18n';

// Router
import { RouterProvider } from 'react-router-dom';
import router from './router/index';

// React Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Redux
import { Provider } from 'react-redux';
import store from './store/index';
import { Toaster, toast } from 'sonner';
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 0,
            refetchOnMount: true,
            refetchOnWindowFocus: false,
        },
    },
});
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Suspense>
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router} />
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
                <Toaster
                    richColors
                    position="bottom-center"
                    duration={5000}
                    expand={true}
                    toastOptions={{
                        style: {
                            width: '500px',
                        },
                    }}
                />
            </Provider>
        </Suspense>
    </React.StrictMode>
);
