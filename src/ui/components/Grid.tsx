import React from "react";

import "@css/components/Grid.scss";

interface IProps {
    id: string;
    cards: number;
    cardGap?: number;
    cardWidth: number;
    cardMapper: (index: number) => React.ReactNode;

    className?: string;
    rowClassName?: string;
}

interface IState {
    rows: number;
    columns: number;
}

class Grid extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            rows: 0, columns: 0
        };
    }

    /**
     * Updates the known width of the component.
     * @private
     */
    private getGridWidth(): number {
        const element = document.getElementById(this.props.id);
        return element?.clientWidth ?? 0;
    }

    /**
     * Computes the rows and columns of the dashboard.
     * @private
     */
    private compute(): void {
        const width = this.getGridWidth();
        const elements = this.props.cards;
        const elementWidth = this.props.cardWidth + (this.props.cardGap ?? 0);

        // Calculate the amount of columns.
        const columns = Math.floor(width / elementWidth);
        // Compute the number of rows required.
        const rows = Math.ceil(elements / columns);

        this.setState({ rows, columns });
    }

    componentDidMount() {
        setTimeout(() => this.compute(), 100);

        window.addEventListener("resize", () => this.compute());
    }

    componentWillUnmount() {
        window.removeEventListener("resize", () => this.compute());
    }

    render() {
        const { cardGap } = this.props;
        const { rows: rowCount, columns: elementsPerRow } = this.state;

        // Create an array of rows -> card indexes.
        const rows: { [key: number]: number[] } = {};
        for (let i = 0; i < rowCount; i++) {
            const elements: number[] = [];
            for (let j = 0; j < elementsPerRow; j++) {
                const index = i * elementsPerRow + j;
                if (index >= this.props.cards) break;

                elements.push(index);
            }

            rows[i] = elements;
        }

        return (
            <div id={this.props.id}
                 className={`Grid ${this.props.className}`}
                 style={{ gap: cardGap }}
            >
                {
                    Object.keys(rows).map((key) => {
                        const row = rows[parseInt(key)];
                        return (
                            <div className={`Grid_Row ${this.props.rowClassName}`}
                                 style={{ gap: cardGap }} key={key}
                            >
                                {
                                    row.map((index) => this.props.cardMapper(index))
                                }
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

export default Grid;
