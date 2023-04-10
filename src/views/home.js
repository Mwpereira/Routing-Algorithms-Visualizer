import {useEffect} from "react";
import {setWindowTitle} from "../utilities/website";
import {HOME_PAGE} from "../constants/pages";

function Home() {
    useEffect(() => {
        setWindowTitle(HOME_PAGE)
    });

    return (
        <>
            <h1 className={'title has-text-centered my-6'}>Welcome to Routing Algorithms!</h1>
            <section className="columns mb-6">
                <div className="container column is-12">
                    <div className="is-flex is-flex-direction-column is-size-5">
                        <h2 className={'title'} style={{fontSize: '30px'}}>CPS 706 - Group 13 - Routing Algorithms</h2>
                        <h3 className={'is-size-4 mb-3 has-text-weight-semibold'}>Group Information:</h3>
                        <p>
                            <ul>
                                <li>Michael Pereira - 500896409</li>
                                <li>Udbhav Prasad - 500909034</li>
                                <li>Himal Patel - 500873885</li>
                                <li>Athavan Thanaraj - 501027195
                                </li>
                                <li>Umair Tariq - 501050119</li>
                                <li>Jared Amaro - 500949423</li>
                            </ul>
                        </p>
                        <h3 className={'has-text-weight-semibold is-size-4 mt-5  mb-3'}>
                            Installation Instructions:
                        </h3>
                        <h4 className={'has-text-weight-semibold mt-2 mb-3'}>
                            Local Development <span className={'is-italic'}>(Recommended)</span>
                        </h4>
                        <p>
                            Required: Node.js Version 18+

                            <br/>

                            Steps on how to run the project locally are located within the `README.md` file in the root
                            of the project.
                        </p>
                        <h4 className={'has-text-weight-semibold mt-5 mb-3'}>
                            Cloud Deployment
                        </h4>
                        <p>
                            Site is located at <a href="https://routing-algorithms.netlify.app/" rel={'noreferrer'} target={'_blank'}>routing-algorithms.netlify.app</a>
                        </p>
                        <h3 className={'has-text-weight-semibold is-size-4 mt-5  mb-3'}>
                            How to use Routing Algorithms website
                        </h3>
                        <h4 className={'has-text-weight-semibold mt-2 mb-3'}>
                            Graph Building User Interface
                        </h4>
                        <p className={'mb-5'}>
                            {`To add nodes to the graph, use the button "Add Node" to the graph. You can drag around this node to make it look
                            better to your liking.`}

                            <br />
                            <br />

                            {`To connect two nodes together, click on "Connect Nodes" then click on the two nodes you would like to connect. After
                            this, once again click on "Connect Nodes" and it will create and draw this edge with a weight of '1'.`}

                            <br />
                            <br />

                            {`To change the weight of an edge, click on the edge and a text-box will pop up below the graph. Then change the value
                            in the text-box and click the "Update Weight" button.`}

                            <br />
                            <br />

                            {`To delete a node, click on the node you wish to delete and click the "Delete Node" button.`}

                            <br />
                            <br />

                            {`To choose a starting node or the number of iterations, choose from either of their dropdown lists (depending on the algorithm).`}

                            <br />
                            <br />

                            {`To calculate a graph, click on the "Calculate" button. This will use the selected algorithm and will display step-by-step instructions on how the algorithm works.`}

                            <br />
                            <br />

                            {`To edit an existing graph that has been calculated, click on the "Edit" button.`}

                            <br />
                            <br />

                            {`To clear the graph, click on the "Rest" button.`}
                        </p>
                        <h3 className={'has-text-weight-semibold is-size-4 mt-5  mb-3'}>
                            {`Dijkstra's Link-State Routing Algorithm`}
                        </h3>
                        <h4 className={'has-text-weight-semibold mt-2 mb-3'}>
                            Algorithm Information
                        </h4>
                        <p className={'ml-5'}>
                            <ol>
                                <li>{`Our implementation of this algorithm takes input of the graph in the form of an adjacency list representation.`}</li>
                                <li>The graph auto-generates text based on the graph and procedure to describe what the algorithm is doing, how it is
                                    doing it and why.</li>
                                <li>{`Dijkstra's algorithm maintains a table which maintains information about the algorithm's work on the graph.`}</li>
                            </ol>
                        </p>
                        <h4 className={'has-text-weight-semibold mt-5 mb-3'}>
                            Algorithm Understanding
                        </h4>
                        <h3 className={'has-text-weight-semibold is-size-4 mt-5  mb-3'}>
                            {`Distance Vector Routing Algorithm`}
                        </h3>
                        <h4 className={'has-text-weight-semibold mt-2 mb-3'}>
                            Algorithm Information
                        </h4>
                        <p className={'ml-5'}>
                            <ol>
                                <li>Our implementation of this algorithm takes input of the graph in the form of an adjacency list representation.</li>
                                <li>The graph auto-generates text based on the graph and procedure to describe what the algorithm is doing, how it is
                                    doing it and why.</li>
                                <li>Each router maintains a table of the least cost paths to other nodes.</li>
                                <li>This algorithm is derived using the Bellman-Ford equation.</li>
                                <li>The number of iterations the algorithm performs to gain full knowledge of the network is equal to the number of
                                    nodes the graph has (worst case).</li>
                            </ol>
                        </p>
                        <h4 className={'has-text-weight-semibold mt-5 mb-3'}>
                            Algorithm Understanding
                        </h4>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home;
