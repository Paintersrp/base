import React from 'react';
import { render, cleanup } from '@testing-library/react';
import TitleBlock from './TitleBlock';

afterEach(cleanup);

describe('TitleBlock', () => {
  it('renders correctly with all props', () => {
    const subtitle = 'Subtitle';
    const title = 'Title';
    const description = 'Description';
    const alignment = 'center';
    const children = <div>Children</div>;
    const showDivider = true;

    const { getByText } = render(
      <TitleBlock
        subtitle={subtitle}
        title={title}
        description={description}
        alignment={alignment}
        children={children}
        showDivider={showDivider}
      />
    );

    expect(getByText(subtitle)).toBeInTheDocument();
    expect(getByText(title)).toBeInTheDocument();
    expect(getByText(description)).toBeInTheDocument();
    expect(getByText('Children')).toBeInTheDocument();
  });

  it('renders correctly with only required props', () => {
    const title = 'Title';

    const { getByText } = render(<TitleBlock title={title} />);

    expect(getByText(title)).toBeInTheDocument();
  });
});
