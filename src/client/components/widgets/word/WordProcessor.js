import React from "react";
import { EditorState, RichUtils, convertFromHTML, ContentState } from "draft-js";
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
			  ]
            }
      
          } else {
            this.state = {
				editorState: EditorState.createEmpty(),
			  	language: WordProcessorSettings.ToolBar.language.options[
					WordProcessorSettings.ToolBar.language.defaultIndex
				]
            }
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
		});
	}
    
    componentDidMount() {
        Editor = require('react-draft-wysiwyg').Editor
		this.setState({ showEditor: true });
	}

	getImageMediaLibrary = (searchAndFilters) => {
		return new Promise(
			(resolve, reject) => {
			  resolve({ data: { links: ["http://dummy_image_src.com"] } })
			}
		)
	}

	
	
	render() {
        if(!this.state.showEditor) return null
		return (
			<Editor
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
						onMediaLibrary={this.getImageMediaLibrary}
						onUpload={this.props.uploadHandler}
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
					gridImageDecorator()
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