// @flow
import React from 'react'
import Lottie from 'react-lottie'
import { path } from 'ramda'
import PubSub from '../../utils/pubSub'

const fetchPubSub = new PubSub()

const fetchMap = new Map()

const fetcher = async (url: string) => {
	const awaitData = () =>
		new Promise((resolve) => {
			const returnAwaited = (resource) => {
				fetchPubSub.unsubscribe(url, returnAwaited)
				resolve(resource.data)
			}
			fetchPubSub.subscribe(url, returnAwaited)
		})

	const loadData = async () => {
		fetchMap.set(url, { loaded: false })
		const data = await fetch(url).then((r) => r.json())
		fetchMap.set(url, { loaded: true, data })
		fetchPubSub.emit(url, { data })
		return data
	}

	const resource = fetchMap.get(url)
	if (resource && resource.data) return resource.data
	if (resource && resource.loaded === false) return awaitData()
	return loadData()
}

/**
 * Animation
 */

type Props = {
	// ...
}

type State = {
	// ...
}

const refPath = path(['file', 'assetUrl'])

class Animation extends React.Component<Props, State> {
	static defaultProps = {
		// ...
	}

	state = {
		animationData: null,
		error: false,
	}

	componentDidMount() {
		this.loadAnimation()
	}

	componentWillReceiveProps(nextProps) {
		const nextAssetUrl = refPath(nextProps)
		const currentAssetUrl = refPath(this.props)
		if (nextAssetUrl !== currentAssetUrl) {
			this.loadAnimation(nextProps)
		}
	}

	loadAnimation = async (props: Props = this.props) => {
		const assetUrl = refPath(props)
		const animationData = await fetcher(assetUrl)
		this.setState({
			animationData,
		})
		// const url = await client.getDocument(ref).then((r) => r.url)
	}

	componentDidCatch(e) {
		console.warn(e)
		this.setState({ error: true })
	}

	render() {
		const { error, animationData } = this.state
		if (error) return <p>There was an error rendering this animation</p>
		if (!animationData) return <p>Loading...</p>
		const options = {
			animationData,
			rendererSettings: {
				preserveAspectRatio: 'xMidYMid slice',
			},
		}
		return <Lottie options={options} />
	}
}

export default Animation
