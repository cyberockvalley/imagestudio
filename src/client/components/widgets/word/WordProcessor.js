import React from "react";
import { EditorState, RichUtils, convertFromHTML, ContentState, convertFromRaw, convertToRaw } from "draft-js";
let Editor
import { isClient } from "../../../../both/Functions"
import '../../../res/css/react-draft.css'
import WordProcessorSettings from "./WordProcessorSettings";
import ImageGrid from "./buttons/imagegrid/index";
import Language from "./buttons/language";
import translationsMap from "./translations";
import { gridImageDecorator } from "./entities/decorators";

class WordProcessor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editorState: EditorState.createEmpty(),
			language: WordProcessorSettings.ToolBar.language.options[
				WordProcessorSettings.ToolBar.language.defaultIndex
			],
			readOnly: false
		}
	}
	
	handleLanguageChange = language => {
		this.setState({language: language})
	}

	getTranslations = key => {
		return translationsMap[key]
	}

	onChange = editorState => {
		this.setState({
			editorState
		})
		if(this.props.onChange) {
			this.props.onChange(convertToRaw(editorState.getCurrentContent()))
		}
	}

	clearEditor = () => {
		this.setState({editorState: EditorState.createEmpty()})
	}

	getEditorState = () => {
		return this.state.editorState
	}

	removeNullStyles = styles => {
		var returnValue = []
		for(var i = 0; i < styles.length; i++) {
			if(Array.isArray(styles[i]) && styles[i].length > 0) {
				returnValue.push(this.removeNullStyles(styles[i]))

			} else {
				if(styles[i]) returnValue.push(styles[i])
			}
			
		}
		return returnValue
	}

	getRaw = () => {
		var raw = this.props.rawContent
		raw.blocks.forEach(block => {
			if(block.inlineStyleRanges && block.inlineStyleRanges.length > 0) {
				block.inlineStyleRanges = this.removeNullStyles(block.inlineStyleRanges)
			}
		})
		return raw
	}
    
    componentDidMount() {
		Editor = require('react-draft-wysiwyg').Editor
		var initialState;
		if(this.props.rawContent) {
			initialState = EditorState.createWithContent(convertFromRaw(this.getRaw()))

		} else {
			initialState = EditorState.createEmpty()
		}
		this.setState({
			editorState: initialState,
			  language: WordProcessorSettings.ToolBar.language.options[
				WordProcessorSettings.ToolBar.language.defaultIndex
			],
			readOnly: false,
			showEditor: true
		})
	}

	updateReadOnly = readOnly => {
		this.setState({readOnly: readOnly})
	}
	
	render() {
        if(!this.state.showEditor) return null
		return (
			<Editor
				placeholder={this.props.placeholder? this.props.placeholder : ""}
				readOnly={this.state.readOnly}
				editorState={this.state.editorState}
				onEditorStateChange={this.onChange}
				toolbar={{
					options: WordProcessorSettings.ToolBar.options,
					emoji: {
						emojis: WordProcessorSettings.ToolBar.emoji.emojis
					}
				}}
				toolbarCustomButtons={[
					<ImageGrid 
						icon={WordProcessorSettings.ToolBar.image_grid.icon} 
						onMediaLibrary={this.props.imageMediaLibraryHandler}
						onUpload={this.props.uploadHandler}
						imageFromPageHandler={this.props.imageFromPageHandler}
						alt={this.props.imageAlt} />,
					<Language 
						currentLanguage={this.state.language} 
						onLanguageChange={this.handleLanguageChange}
						options={WordProcessorSettings.ToolBar.language.options} />
				]}
				customDecorators={[
					gridImageDecorator({
						onChange: this.onChange,
						getEditorState: this.getEditorState,
						translations: this.getTranslations(this.state.language.key),
						onMediaLibrary: this.getImageMediaLibrary,
						onUpload: this.handleImageUpload,
						updateReadOnly: this.updateReadOnly
					})
				]}
				localization={{
					locale: this.state.language.key,
					translations: this.getTranslations(this.state.language.key)
				}}
			/>
		);
	}
}

export default WordProcessor