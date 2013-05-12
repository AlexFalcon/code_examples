<? class ControllerCatalogDisplaycat extends Controller {
	public function index () {
		$this->language->load('catalog/displaycat');
		$this->document->setTitle($this->language->get('heading_title'));
		$this->load->model('catalog/displaycat');
		
		$this->data['breadcrumbs'] = array();
		
      	$this->data['breadcrumbs'][] = array(
        	'text'      => $this->language->get('text_home'),
			'href'      => $this->url->link('common/home'),
        	'separator' => false
      	);
		$this->data['breadcrumbs'][] = array(
        	'text'      => $this->language->get('heading_title'),
			'href'      => $this->url->link('catalog/displaycat'),
        	'separator' => $this->language->get('text_separator')
      	);
		$this->data['heading_title'] = $this->language->get('heading_title');
	
		if (file_exists(DIR_TEMPLATE . $this->config->get('config_template') . '/template/catalog/displaycat.tpl')) {
				$this->template = $this->config->get('config_template') . '/template/catalog/displaycat.tpl';
			} else {
				$this->template = 'default/template/catalog/displaycat.tpl';
			}
		$this->children = array(
			'common/column_left',
			'common/column_right',
			'common/content_top',
			'common/content_bottom',
			'common/footer',
			'common/header',
			'common/verx'
		);
		$this->data['home'] = $this->url->link('common/home');
		/* echo $this->request->get['catalog']; */
		if (isset($this->request->get['catalog'])) {
			$catalog_id = $this->request->get['catalog'];
		}
		else {
			$catalog_id = "category_id";
		}
		$this->data['catalog'] = $this->model_catalog_displaycat->getCatalog(0, $catalog_id);
		
		$this->data['img_width'] = $this->config->get('config_image_product_width');
		$this->data['img_height'] = $this->config->get('config_image_product_height');
			
		
		
		$this->response->setOutput($this->render());
	}

}