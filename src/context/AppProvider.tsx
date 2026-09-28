import React, { PropsWithChildren } from 'react';
import { PracticeProvider } from './PracticeContext';
import { ProfileProvider } from './ProfileContext';
import { LearnProvider } from './LearnContext';
import { QuizProvider } from './QuizContext';
import { MatchProvider } from './MatchContext';
import { PlansProvider } from './PlansContext';
import { OrderProvider } from './OrderContext';

export function AppProvider({ children }: PropsWithChildren): React.JSX.Element {
  return (
    <ProfileProvider>
      <LearnProvider>
        <QuizProvider>
          <MatchProvider>
            <PlansProvider>
              <OrderProvider>
                <PracticeProvider>{children}</PracticeProvider>
              </OrderProvider>
            </PlansProvider>
          </MatchProvider>
        </QuizProvider>
      </LearnProvider>
    </ProfileProvider>
  );
}
