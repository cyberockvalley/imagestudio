import React from "react";
import { EditorState, RichUtils, convertFromHTML, ContentState, convertFromRaw, convertToRaw } from "draft-js";
let Editor
import { isClient } from "../../../../both/Functions"
import '../../../res/css/react-draft.css'
import WordProcessorSettings from "./WordProcessorSettings";
import Image from "./buttons/image/index";
import ImageGrid from "./buttons/imagegrid/index";
import Language from "./buttons/language";
import translationsMap from "./translations";
import { gridImageDecorator } from "./entities/decorators";

class WordProcessor extends React.Component {
	constructor(props) {
		super(props);
		if(isClient()) {
            const headerOne = '';
            const blocksFromHTML = convertFromHTML(headerOne)
            const state = ContentState.createFromBlockArray(
              blocksFromHTML.contentBlocks,
              blocksFromHTML.entityMap
            )
            this.state = {
			  editorState: EditorState.createEmpty(),//EditorState.createWithContent(state)
			  language: WordProcessorSettings.ToolBar.language.options[
				  WordProcessorSettings.ToolBar.language.defaultIndex
			  ],
			  readOnly: false
            }
      
          } else {
            this.state = {
				editorState: EditorState.createEmpty(),
			  	language: WordProcessorSettings.ToolBar.language.options[
					WordProcessorSettings.ToolBar.language.defaultIndex
				],
				readOnly: false
            }
		}
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
		console.log("getTrans", key, translationsMap[key])
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
    
    componentDidMount() {
		Editor = require('react-draft-wysiwyg').Editor
		var initialState;
		if(this.props.rawContent) {
			console.log("rawContent", "wordProcessor", this.props.rawContent)
			initialState = EditorState.createWithContent(convertFromRaw(this.props.rawContent))

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
					<Image 
						icon={WordProcessorSettings.ToolBar.image.icon} 
						onMediaLibrary={this.props.imageMediaLibraryHandler}
						onUpload={this.props.uploadHandler}
						imageFromPageHandler={this.props.imageFromPageHandler}
						alt={this.props.imageAlt} />,
					<ImageGrid 
						icon={WordProcessorSettings.ToolBar.image_grid.icon} 
						onMediaLibrary={this.getImageMediaLibrary}
						onUpload={this.handleImageUpload}
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