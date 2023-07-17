!(function($){if(typeof $().tooltip==='function')
$('body').tooltip({selector:'[title]',trigger:'hover'});(window.globalModal=$('#modal')),(window.ajaxCache=[]);$('body').on('click','.dropdown-active',function(e){e.stopPropagation()});$('.filter-item .dropdown-menu li').on('click',function(){let i=$(this),t=i.attr('value'),a=i.text();i.closest('.filter-item').find('li.selected').removeClass('selected'),i.addClass('selected');let s=i.closest('.filter-item').attr('id');$(`#${s}`).find('input').val(t);$(`#${s}`).find('.filter-value').html(a);}),$('.filter-item .dropdown-menu li.selected').trigger('click');$('.toggle-search').on('click',()=>{!$('.header-search').toggleClass('d-none').hasClass('d-none')&&$('#query').focus()})})(jQuery);const searchResults=$('.search-results')
$('.header-search').on('click',function(e){if(e.target.className==='backdrop')searchResults.removeClass('show')
else if(!searchResults.is(':empty'))searchResults.addClass('show')})
$('.backdrop').on('click',()=>searchResults.removeClass('show'))
$('#query').on('keyup',function(){let query=$(this).val().trim()
if(!query.length)searchResults.html('')
window.ajax&&ajax.abort()&&clearTimeout(timeout)
if(query.length>3){window.timeout=setTimeout(()=>{window.ajax=$.get('/search',{query},data=>{searchResults.addClass('show').html(data)})},100)}})
const trailer=id=>{if(!id||id==='')return;let iframe=`<iframe src="https://www.youtube-nocookie.com/embed/${id}" allowfullscreen="1"></iframe>`
globalModal.find('.modal-dialog').html(`<div id="trailer">${iframe}</div>`)
globalModal.modal('show')}
globalModal.on('hidden.bs.modal',()=>{globalModal.find('.modal-dialog').html('')})
const toast=(status,message)=>{let toast=$(`<div id='${+new Date()}' class='toast animated bounceIn'>
		<div class='alert alert-${status} mb-0 ' role='alert'>${message}</div>
	</div>`);$('.toast').remove()&&$('body').append(toast);setTimeout(()=>toast.fadeOut().remove(),3000);};const redirect=(url,target='_self')=>window.open(url,target,'noopener,noreferrer');const ajaxModal=(source,delay=100)=>{$('.modal').addClass('loading');window.event?.preventDefault();let cacheModal=window.ajaxCache[source]??null;if(cacheModal){globalModal.find('.modal-dialog').html(cacheModal);$('.modal').removeClass('loading').modal('hide');return setTimeout(()=>globalModal.modal('show'),delay);}
$.getJSON(source,(resp)=>{if(resp.hasOwnProperty('error'))return toast('danger',resp.error);globalModal.find('.modal-dialog').html(resp.data);$('.modal').removeClass('loading').modal('hide');window.ajaxCache[source]=resp.data;setTimeout(()=>globalModal.modal('show'),delay);globalModal.on('shown.bs.modal',()=>$('input:first').focus());}).fail((e)=>{$('.modal').removeClass('loading');toast('danger','Something went wrong');});};$(document).on('submit','form.ajax',function(e){e.preventDefault();e.stopPropagation();$(this).addClass('loading');$.ajax({url:$(this).attr('action'),type:'post',data:$(this).serializ$(),success:(response)=>{if(response.success){if(response.hasOwnProperty('target'))
$(response.target).html(response.data);else if(typeof response.url!=='undefined')
redirect(response.url);else location.reload();}else{toast('danger',response.message??'Something went wrong.');if(typeof response.url!=='undefined')redirect(response.url);$(this).removeClass('loading');}},error:(err)=>{$(this).removeClass('loading');toast('danger','Something went wrong.');},});});