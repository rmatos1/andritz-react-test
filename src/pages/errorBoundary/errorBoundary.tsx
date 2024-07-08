import { Component, ReactNode } from 'react';
import { svg } from '@/assets';
import { PagePaths } from '@/types';

import globalStyles from "@/app.module.scss";

export interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  componentDidCatch(error: any) {
    console.log(error);

    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
        return (
            <main className={globalStyles.centeredContainer}>

                <h1 className={globalStyles.title} data-testid="error-title">We got an error!</h1>
                    
                <img src={svg.brokenApp} alt="" className={globalStyles.img} />

                <p className={globalStyles.text}>Sorry, we got a momentary malfunctioning.<br />Click on the link below to refresh the page</p>

                <a href={PagePaths.home}>Refresh</a>

            </main>
        );
    }
    return this.props.children;
  }
}
