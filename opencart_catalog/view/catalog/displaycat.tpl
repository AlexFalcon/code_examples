<?php echo $verx;?>
<?php echo $header; ?>
<div id="page_content"><!-- <?php echo $content_top; ?> -->
  <div class="breadcrumb">
    <?php foreach ($breadcrumbs as $breadcrumb) { ?>
    <?php echo $breadcrumb['separator']; ?><a href="<?php echo $breadcrumb['href']; ?>"><?php echo $breadcrumb['text']; ?></a>
    <?php } ?>
  </div>
  <h1>Каталог</h1>
  
  
  <?php
function replace_img($image, $width, $height) {  
		$dot_pos = strrpos($image, '.', -1);
			if ($dot_pos) {
				$ex = substr($image, $dot_pos);
				$replace = '-' . $width . 'x' . $height . $ex;
				$image = str_replace($ex, $replace, $image);
				return $image;
			}
	}
  if($catalog) foreach ($catalog as $categories) {
		
	?> <div class="cat_name"><a href="<?echo $home . $categories['seo_url'];?>"><? echo $categories['name']; ?></a></div>
		<?
		if ($categories['products']) foreach ( $categories['products'] as $product) {
		//--подстановка в путь до фотки ее размера
			$product['image'] = replace_img($product['image'], $img_width, $img_height);
			//---
		?> <div class="product_box"><a href="<?echo $home . $categories['seo_url'] . '/' . $product['seo_url'];?>"><img src="<?echo $home . 'image/cache/' . $product['image'];?>"/><br /><?echo $product['name'];?></a> <br /> <?echo sprintf("%.2f", $product['price']) . ' Руб.';?> </div>  <?
		}
			
		
		if ($categories['child']) 
		foreach ($categories['child'] as $subcat ) {
			?><div class="subcat"><a href="<?echo $home . $categories['seo_url'] . '/' . $subcat['seo_url'];?>"><?echo $subcat['name']; ?> </a></div> <?
			if($subcat['products'])
			foreach ($subcat['products'] as $product ) {
				$product['image'] = replace_img($product['image'], $img_width, $img_height);
				?> <div class="product_box"><a href="<?echo $home  . $categories['seo_url'] . '/' . $subcat['seo_url'] . '/' . $product['seo_url'];?>"><img src="<?echo $home . 'image/cache/' . $product['image'];?>"/><br /><?echo $product['name'];?></a><br /> <?echo sprintf("%.2f", $product['price']) . ' Руб.';?> </div>  <?
			
			}
		}
		
		?>
		<?
	
  }
  ?>
  <pre>
  <?//print_r ($catalog);?>
	</pre>
  <?php echo $content_bottom; ?></div>
<?php echo $footer; ?>