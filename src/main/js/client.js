/**
 * Created by eric on 6/30/17.
 */

'use strict';

import rest from 'rest';
import defaultRequest from 'rest/interceptor/defaultRequest';
import errorCode from 'rest/interceptor/errorCode';
import mime from 'rest/interceptor/mime';
import baseRegistry from 'rest/mime/registry';
import hal from 'rest/mime/type/application/hal';

import uriListConverter from './api/uriListConverter';
import uriTemplateInterceptor from './api/uriTemplateInterceptor';

const registry = baseRegistry.child();

registry.register('text/uri-list', uriListConverter);
registry.register('application/hal+json', hal);

export default rest
                .wrap(mime, { registry: registry })
                .wrap(uriTemplateInterceptor)
                .wrap(errorCode)
                .wrap(defaultRequest, { headers: { 'Accept': 'application/hal+json' }});