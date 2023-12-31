import * as React from 'react';
import { DefaultButton } from '@fluentui/react/lib/Button';
import Header from './Header';
import HeroList, { HeroListItem } from './HeroList';
import Progress from './Progress';
import logo from '../../../assets/logo-filled.png';

/* global console, Excel  */

export interface AppProps {
  title: string;
  isOfficeInitialized: boolean;
}

export interface AppState {
  listItems: HeroListItem[];
}

export default class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps, context: AppState) {
    super(props, context);
    this.state = {
      listItems: [],
    };
  }

  componentDidMount() {
    this.setState({
      listItems: [
        {
          icon: 'Ribbon',
          primaryText: 'Achieve more with Office integration',
        },
        {
          icon: 'Unlock',
          primaryText: 'Unlock features and functionality',
        },
        {
          icon: 'Design',
          primaryText: 'Create and visualize like a pro',
        },
      ],
    });
  }

  click = async () => {
    try {
      await Excel.run(async (context) => {
        /**
         * Insert your Excel code here
         */
        const range = context.workbook.getSelectedRange();

        // Read the range address
        range.load('address');

        // Update the fill color
        range.format.fill.color = 'yellow';

        await context.sync();
        console.log(`The range address was ${range.address}.`);
      });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { title, isOfficeInitialized } = this.props;

    if (!isOfficeInitialized) {
      return (
        <Progress
          title={title}
          logo={logo}
          message="Please sideload your addin to see app body."
        />
      );
    }

    return (
      <div className="ms-welcome">
        <Header logo={logo} title={this.props.title} message="Welcome" />
        <HeroList
          message="Discover what Office Add-ins can do for you today!"
          items={this.state.listItems}
        >
          <p className="ms-font-l">
            Modify the source files, then click <b>Run</b>.
          </p>
          <DefaultButton
            className="ms-welcome__action"
            iconProps={{ iconName: 'ChevronRight' }}
            onClick={this.click}
          >
            Run
          </DefaultButton>
        </HeroList>
      </div>
    );
  }
}
