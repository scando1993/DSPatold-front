<template>
    <div>
       <div class="breadcrumb">
            <slot name="header">
               <h1>{{page}}</h1>
                    <ul v-if="has_folder">
                        <li><a href=""> {{folder}} </a></li>
                        <li> {{page}} </li>
                    </ul>
            </slot>
        </div>
        <div class="separator-breadcrumb border-top"></div>
    </div>
</template>
<script>
export default {
    props:['page','folder'],
		computed:{
    	has_folder: function (){
    		return this.folder !== '';
	    }
		}
}
</script>
