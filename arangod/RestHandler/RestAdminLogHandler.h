////////////////////////////////////////////////////////////////////////////////
/// @brief admin log request handler
///
/// @file
///
/// DISCLAIMER
///
/// Copyright 2014 ArangoDB GmbH, Cologne, Germany
/// Copyright 2004-2014 triAGENS GmbH, Cologne, Germany
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///     http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///
/// Copyright holder is ArangoDB GmbH, Cologne, Germany
///
/// @author Achim Brandt
/// @author Copyright 2014, ArangoDB GmbH, Cologne, Germany
/// @author Copyright 2010-2014, triAGENS GmbH, Cologne, Germany
////////////////////////////////////////////////////////////////////////////////

#ifndef ARANGODB_REST_HANDLER_REST_ADMIN_LOG_HANDLER_H
#define ARANGODB_REST_HANDLER_REST_ADMIN_LOG_HANDLER_H 1

#include "Basics/Common.h"
#include "RestHandler/RestAdminBaseHandler.h"

namespace triagens {
  namespace admin {

// -----------------------------------------------------------------------------
// --SECTION--                                         class RestAdminLogHandler
// -----------------------------------------------------------------------------

////////////////////////////////////////////////////////////////////////////////
/// @brief admin log request handler
////////////////////////////////////////////////////////////////////////////////

    class RestAdminLogHandler : public RestAdminBaseHandler {

// -----------------------------------------------------------------------------
// --SECTION--                                      constructors and destructors
// -----------------------------------------------------------------------------

      public:

////////////////////////////////////////////////////////////////////////////////
/// @brief constructor
////////////////////////////////////////////////////////////////////////////////

        RestAdminLogHandler (rest::HttpRequest*);

// -----------------------------------------------------------------------------
// --SECTION--                                                   Handler methods
// -----------------------------------------------------------------------------

      public:

////////////////////////////////////////////////////////////////////////////////
/// {@inheritDoc}
////////////////////////////////////////////////////////////////////////////////

        bool isDirect () const override;

////////////////////////////////////////////////////////////////////////////////
/// @brief returns the log files (inheritDoc)
////////////////////////////////////////////////////////////////////////////////

        status_t execute () override;
    };
  }
}

#endif

// -----------------------------------------------------------------------------
// --SECTION--                                                       END-OF-FILE
// -----------------------------------------------------------------------------

// Local Variables:
// mode: outline-minor
// outline-regexp: "/// @brief\\|/// {@inheritDoc}\\|/// @page\\|// --SECTION--\\|/// @\\}"
// End:
